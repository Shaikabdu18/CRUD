const Order = require("../models/orderModel")


// CreateOrder
exports.createOrder = async(req,res)=>{
  const {products,totalPrice}=req.body;
  try {
    const newOrder = new Order({
      user:req.user.id,
      products,
      totalPrice
    })
    await newOrder.save()
    res.status(201).json({msg:"Order Saved successfully"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

//Get by OrderId

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products').populate('user', 'username email');
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order

exports.updateOrder = async(req,res)=>{
  try {
    const order = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!order) return res.status(404).json({msg:"Order Not Found"})
    return res.status(201).json(order)
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}