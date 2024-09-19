const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes")
const dotenv = require("dotenv")
dotenv.config()

app.use(express.json());
app.use("/api",productRoutes)
app.use("/api",authRoutes)




mongoose.
connect(process.env.DB)
.then(()=>{
  app.listen(3000,()=>{
    console.log("Server Running in port 3000");
    console.log("Connected To MongoDB");
  })  
}).catch((error)=>{
  console.log(error.message);
})