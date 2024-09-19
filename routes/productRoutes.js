const express = require("express")
const router = express.Router()
const prodectControllers = require("../controllers/productControllers")
const {verifyToken} = require("../verifyToken")

router.post("/products",verifyToken,prodectControllers.createProduct)
router.get("/products",prodectControllers.allProduct)
router.get("/products/:id",prodectControllers.productbyid)
router.put("/products/:id",verifyToken,prodectControllers.updateProduct)
router.delete("/products/:id",verifyToken,prodectControllers.deleteProduct)

module.exports = router;


