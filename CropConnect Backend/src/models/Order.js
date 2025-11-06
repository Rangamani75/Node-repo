const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
items: [{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
quantity: Number,
unitPrice: Number,
totalPrice: Number
}],
status: { type: String, enum: ['PLACED','ACCEPTED','PACKED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'], default: 'PLACED' },
totalAmount: Number,
deliveryAddress: String,
deliveryLocation: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: [Number]
},
isBulk: { type: Boolean, default: false },
bulkGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'BulkGroup' },
createdAt: { type: Date, default: Date.now },
notes: String
});


module.exports = mongoose.model('Order', OrderSchema);