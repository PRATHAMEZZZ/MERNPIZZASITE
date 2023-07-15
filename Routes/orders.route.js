import express from "express"
import { Authenticate } from "../Middleware/userAuth"
import { addOrder, cancelOrder, getOrders } from "../Controller/order.controller"

const route=express.Router()

route.post("/addOrders",Authenticate,addOrder)
route.get("/getOrders",Authenticate,getOrders)
route.delete("/delOrder/:id",cancelOrder)

export default route