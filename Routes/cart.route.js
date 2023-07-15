import express from "express"
import { addToCart,delCart,getCart, updateQty } from "../Controller/cart.controller"
import { Authenticate } from "../Middleware/userAuth"

const route=express.Router()

route.post("/addToCart",Authenticate,addToCart)
route.get("/getCart",Authenticate,getCart)
route.patch("/updateQty/:id",Authenticate,updateQty)
route.delete("/deleteCart/:id",Authenticate,delCart)




export default route