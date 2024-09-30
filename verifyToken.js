const jwt =require("jsonwebtoken")

exports.verifyToken=(req,res,next)=>{
  try {
   token = req.header("Authorization")
  if(!token) return res.status(400).json({msg:"UnAuthorized No token Provided"})
  const verify = jwt.verify(token,process.env.JWT)
  // console.log(verify)
  req.user = verify
  next();
    
  } catch (error) {
    return res.status(500).json({msg:error.message})
}
}
