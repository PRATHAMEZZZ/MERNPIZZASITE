import mongoose from "mongoose"

const Schema=mongoose.Schema

const userModel=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("users",userModel)    