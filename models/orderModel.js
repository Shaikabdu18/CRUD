const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
  totalPrice:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    enum:["Pending","Shipped","Delivered","Cancelled"],
    default:"Pending"
  }
},
{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)