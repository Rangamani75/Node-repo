const mongoose = require("mongoose")
const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
        console.log("successfully connected to mongoDB")
    } catch (error) {
        console.log("failed to connect mongodb",error)
        
    }

    
}
module.exports = connectDB