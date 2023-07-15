import mongoose from "mongoose";
import CategoryModel from "./Category.model";
const productModel=new mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:["veg","NonVeg"]
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:CategoryModel,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

export default mongoose.model("products",productModel)