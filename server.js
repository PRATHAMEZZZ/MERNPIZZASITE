import express from "express"
import mongoose from "mongoose"
import CatRoute from "./Routes/category.route"
import ProdRoute from "./Routes/product.route"
import UserRoute from "./Routes/user.route"
import CartRoute from "./Routes/cart.route"
import OrderRoute from "./Routes/orders.route"
import cors from "cors"



const app=express()
const PORT=8080


mongoose.connect('mongodb://127.0.0.1:27017/cafe')
  .then(() => console.log('Connected!'));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors())
  app.use(express.json())
  app.use(express.static(__dirname))
  app.use("/category",CatRoute)
  app.use("/product",ProdRoute)
  app.use("/user",UserRoute)
  app.use("/cart",CartRoute)
  app.use("/orders",OrderRoute)





