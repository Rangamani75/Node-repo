const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const addUser = async(req,res)=>{
	try{
         let user = await userModel.create(req.body);
		 res.status(201).json({message:"user created ",user});
	}
	catch(err){
		res.status(500).json({error:"Something went wrong",err})
	}
}


const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push(req.body);
    await user.save();
    res.json({ message: "Address added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserSummary = async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    let totalAddresses = 0;

    const summary = users.map(user => {
      const count = user.addresses.length;
      totalAddresses += count;
      return {
        name: user.name,
        addressCount: count
      };
    });

    res.json({ totalUsers, totalAddresses, summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BONUS: Delete specific address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ error: "Address not found" });

    address.remove();
    await user.save();

    res.json({ message: "Address deleted", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
	addUser,
	addAddress,deleteAddress,getUserDetails,
	getUserSummary,
}