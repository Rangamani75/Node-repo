const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
role: { type: String, enum: ['farmer','buyer','admin'], default: 'buyer' },
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
passwordHash: { type: String, required: true },
contact: String,
address: String,
location: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: { type: [Number], default: [0,0] } // [lng, lat]
},
farmDetails: {
size: Number,
crops: [String],
sustainableCertified: { type: Boolean, default: false },
certificationDocuments: [String]
},
favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
createdAt: { type: Date, default: Date.now }
});


userSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('User', userSchema);