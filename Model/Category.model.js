import mongoose from "mongoose";

const CategoryModel=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique:true
    },
    categoryImage:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
})

export default mongoose.model("categories",CategoryModel)