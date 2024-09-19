const Product = require("../models/Productmodels")

exports.allProduct=async(req,res) =>{
  try {
    const products  = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
exports.productbyid=async(req,res)=>{
  try {
    const{id} = req.params
    const product  = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
// Create Product
exports.createProduct=async(req,res)=>{
  const {name,quantity,price,image}=req.body;
  const postedBy = req.user.id
try {
  const product = new Product({
    name,
    quantity,
    price,image,postedBy
  })
  await product.save()
  res.status(200).json(product);
} catch (error) {
  console.log(error.message);
  res.status(500).json({message:error.message})
}
}
//update a product
exports.updateProduct=async(req,res)=>{
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
}

//delete a product

exports.deleteProduct=async(req,res)=>{
  try {
    const {id} = req.params;
    // console.log(id)
    // console.log(req.query)
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID${id}`})
    }
    res.status(200).json({msg:"Product Deleted SuccessFully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}