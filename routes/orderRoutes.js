const express = require("express")
const {verifyToken}  = require("../verifyToken")
const router = express.Router()
const orderController = require("../controllers/orderController")

router.post("/createOrder",verifyToken,orderController.createOrder)
router.get("/getOrder/:id",verifyToken,orderController.getOrderById)
router.patch("/UpdateOrder/:id",verifyToken,orderController.updateOrder)


module.exports = router