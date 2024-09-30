const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"Please enter a product name"]
    },
    quantity:{
      type: Number,
      required: true,
      default: 0
    },
    price:{
      type: Number,
      required: true
    },
    image:{
      type: [String],
      required: false,
    },
    postedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Product",productSchema )