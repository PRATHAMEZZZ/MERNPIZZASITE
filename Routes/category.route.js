import express from "express"
import { AddCategory, delCategory, getCategory, updateCat } from "../Controller/category.controller"

const route=express.Router()

route.post("/",AddCategory)
route.get("/getCategory",getCategory)
route.delete("/delCategory/:id",delCategory)
route.patch("/updCategory/:id",updateCat)



export default route