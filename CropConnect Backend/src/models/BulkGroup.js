const mongoose = require('mongoose');


const contributionSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
qty: Number,
createdAt: { type: Date, default: Date.now }
});


const bulkGroupSchema = new mongoose.Schema({
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
targetQty: Number,
contributions: [contributionSchema],
expiry: Date,
discountPercent: { type: Number, default: 0 },
isClosed: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('BulkGroup', bulkGroupSchema);