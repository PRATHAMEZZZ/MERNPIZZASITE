import express from "express"

import { addProduct, delProduct, getProduct, productByCategory, updateProduct } from "../Controller/product.controller"

const route=express.Router()

route.post("/",addProduct)
route.get("/getProducts",getProduct)
route.delete("/delProduct/:id",delProduct)
route.patch("/updateProduct/:id",updateProduct)
route.get("/prodByCat/:id",productByCategory)









export default route