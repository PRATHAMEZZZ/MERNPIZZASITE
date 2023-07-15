import mongoose from "mongoose";
import orderModel from "../Model/order.model";
import cartModel from "../Model/cart.model";

export const addOrder=async(req,res)=>{
    try {
        const user=req.users.userData
        const cart=await cartModel.find({user:user})
        console.log(cart)

        const data=await new orderModel({
            userId:user,
            productId:cart.map((ele)=>{
                return ele.product
            })
        })
        data.save()
        await cartModel.deleteMany({user:user})

        if(data){
            return res.status(201).json({
                data:data,
                message:"product added to Orders",
            })
        }
        }
    catch (error) {
        return res.status(201).json({
            message:error.message
        })
    }
}


export const getOrders=async(req,res)=>{
        try {
            const user=req.users.userData
            const data=await orderModel.find({userId:user}).populate("productId").populate("userId")
            if(data){
                return res.status(201).json({
                    data:data,
                    message:"All Orders",
                })
            }
        } catch (error) {
                return res.status(201).json({
                    message:error.message
                })
        }
}

export const cancelOrder=async(req,res)=>{
    try {
        const id=req.params.id
        const order=await orderModel.deleteOne({_id:id})
        if(order){
            return res.status(201).json({
                data:order,
                message:"order cancel",
            })
        }
    } catch (error) {
        return res.status(201).json({
            message:error.message
        })
    }
}
