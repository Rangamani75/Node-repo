
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{

	let token = req.headers?.authorization?.split(" ")[1];
	console.log(req.headers.authorization)
	if(token){
		let decoded = jwt.verify(token,process.env.secret_key);
		if(decoded){
			req.user=decoded.userId;
			next();
		}else{
			res.status(404).json({messgae:"Login Failed,please Login again!"})
		}
	}
	else{
		res.status(404).json({Error:"Un Authorised"});
	}


}
module.exports = authMiddleware;