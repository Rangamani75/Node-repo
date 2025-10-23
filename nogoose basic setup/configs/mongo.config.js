const mongoose = require("mongoose")
async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/test")
        console.log("connected to db ")
        
    } catch (error) {
        console.log("something went wrong")
        
    }
    
}
module.exports = connect
