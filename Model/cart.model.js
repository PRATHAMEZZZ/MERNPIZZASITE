import mongoose from "mongoose";
import userModel from "../Model/user.model"
import productModel from "./product.model";
const cartModel=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:userModel,
        required:true,
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:productModel,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true,
    }
})

export default mongoose.model("cart",cartModel)