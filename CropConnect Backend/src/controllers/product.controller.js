const Product = require('../models/Product');
const User = require('../models/User');
const { computeDynamicPrice } = require('../services/pricing.service');

// ---------------------------- CREATE PRODUCT ---------------------------- //

exports.createProduct = async (req, res) => {
  try {
    // Only farmers should be able to create products
    if (req.user.role !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can create products' });
    }

    const { 
      name, description, category, quantity, price, 
      tags, availableFrom, availableTo, lng, lat 
    } = req.body;

    // Validate required fields
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "Name, price, and quantity are required." });
    }

    // Location format (GeoJSON)
    const location = { 
      type: 'Point', 
      coordinates: [Number(lng), Number(lat)] 
    };

    // Compute dynamic price initially equal to base price
    const dynamicPrice = computeDynamicPrice(price);

    const product = await Product.create({
      farmer: req.user._id,
      name,
      description,
      category,
      quantity,
      price,
      dynamicPrice,
      tags: tags ? tags.split(',') : [],
      availableFrom,
      availableTo,
      location
    });

    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ---------------------------- GET ALL PRODUCTS ---------------------------- //

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name phone');
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


// ---------------------------- GET SINGLE PRODUCT BY ID ---------------------------- //

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name phone');
    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


// ---------------------------- UPDATE PRODUCT ---------------------------- //

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, farmer: req.user._id });

    if (!product) {
      return res.status(404).json({ message: "Product not found or not owned by farmer" });
    }

    Object.assign(product, req.body);

    // Recompute dynamic price if price changed
    if (req.body.price) {
      product.dynamicPrice = computeDynamicPrice(req.body.price);
    }

    await product.save();
    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


// ---------------------------- DELETE PRODUCT ---------------------------- //

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });

    if (!product) {
      return res.status(404).json({ message: "Product not found or not owned by farmer" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
