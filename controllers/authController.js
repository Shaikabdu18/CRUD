const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


//RegisterUser
exports.registerUser = async(req,res)=>{
  const {username,email,password} = req.body;
  try {
    const userExists = await User.findOne({email:email.toLowerCase()}) 
    if(userExists) return res.status(400).json({msg:"User Already Exists"})
    const hashedpassword = await bcrypt.hash(password,10)
    const user = new User({
      username,
      email:email.toLowerCase(),
      password:hashedpassword
    })
    await user.save()
    return res.status(201).json({msg:"User Registered successfully"})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}

// Login
exports.loginUser = async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({msg:"User Not Exists"})
    const match = bcrypt.compare(password,user.password)
    if(!match) return res.status(400).json({msg:"Invalid password"})
      const token = jwt.sign({id:user.id,name:user.username},process.env.JWT,{expiresIn:"30d"})
    return res.status(200).json({token})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}