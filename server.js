const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/Productmodels');
const product = require('./models/Productmodels');

app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello")
})
app.get('/blog',(req,res)=>{
  res.send("hi")
})
app.get('/products',async(req,res) =>{
  try {
    const products  = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})
app.get('/products/:id', async(req,res)=>{
  try {
    const{id} = req.params
    const product  = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
app.post('/products',async(req,res)=>{
try {
  const product = await Product.create(req.body);
  res.status(200).json(product);
} catch (error) {
  console.log(error.message);
  res.status(500).json({message:error.message})
}
})
//update a product
app.put('/products/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    // we cannot find any product in database
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID${id}`})
    }
    const updateProduct = await Product.findById(id);

    res.status(200).json(updateProduct);
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

//delete a product

app.delete('/products/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID${id}`})
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

mongoose.
connect('mongodb+srv://shaikabdu49:1234567shaik@crudapi.rxu1td9.mongodb.net/Node_API?retryWrites=true&w=majority&appName=CRUDAPI')
.then(()=>{
  console.log("Connected To MongoDB");
  app.listen(3000,()=>{
    console.log("Server Running in port 3000");
  })  
}).catch((error)=>{
  console.log(error);
})