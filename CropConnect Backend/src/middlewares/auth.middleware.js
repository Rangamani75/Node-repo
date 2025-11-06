const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function auth(req,res,next){
try{
const header = req.header('Authorization');
if(!header) return res.status(401).json({ message: 'Missing token' });
const token = header.replace('Bearer ', '');
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.id);
if(!user) return res.status(401).json({ message: 'Invalid token' });
req.user = user;
next();
}catch(err){
return res.status(401).json({ message: 'Unauthorized', error: err.message });
}
}


const authorizeRole = (roles = []) => (req,res,next) => {
if (!Array.isArray(roles)) roles = [roles];
if(!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
next();
};


module.exports = { auth, authorizeRole };