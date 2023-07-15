import mongoose from "mongoose";
import productModel from "./product.model";
import userModel from "./user.model"
const orderModel=new mongoose.Schema({
    productId:{
        type:[mongoose.Types.ObjectId],
        ref:productModel,
        required:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:userModel,
        required:true,
    },
    OrderDate:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("orders",orderModel)