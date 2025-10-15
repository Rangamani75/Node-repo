const express = require("express")
const connectDB = require("./config/db")
const authorRoutes = require('./routes/authorRoutes');
const app = express()
app.use(express.json());
app.use('/api/authors', authorRoutes);
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.listen(5000,async()=>{
    await connectDB()
    
    console.log("listening 5000 port")
})
