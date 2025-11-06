const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
name: { type: String, required: true, index: true },
description: String,
category: String,
quantity: { type: Number, required: true },
price: { type: Number, required: true },
dynamicPrice: { type: Number },
images: [String],
availableFrom: Date,
availableTo: Date,
location: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: { type: [Number], required: true } // [lng, lat]
},
tags: [String],
createdAt: { type: Date, default: Date.now }
});


productSchema.index({ location: '2dsphere' });
productSchema.index({ name: 'text', description: 'text', category: 'text', tags: 'text' });


module.exports = mongoose.model('Product', productSchema);