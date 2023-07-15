import userModel from "../Model/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers= async(req,res)=>{
    try {
        const userData = await userModel.find();
       if(userData){
        return res.status(200).json({
            data:userData,
            message:'Success'
        })
       }
    } catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}


export const addUser=async(req,res)=>{
    try {
        console.log(req.body)
        const {name,email,contact,address,password,role}=req.body
        const encryptPass=await bcrypt.hash(password,10)
        const addData= new userModel({
            name:name,
            email:email,
            contact:contact,
            address:address,
            password:encryptPass,
            role:role
        })
        addData.save()
        const token=jwt.sign({userId:addData._id},"SECRETTOKEN")
        if(addData){
            return res.status(200).json({
                data:addData,
                token:token,
                message:"succesfully added"
            })
        }
    } catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}


export const getUser=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await userModel.findById({_id:id})
        if(user){
           return res.status(200).json({
                data:user,
                message:"single user"
            })
        }
    } catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}


export const delUser=async(req,res)=>{
    try{
    const  id=req.params.id
    const deletedData=await userModel.deleteOne({_id:id})
    if(deletedData){
       return res.status(200).json({
            data:deletedData,
            message:"single user deleted"
        })
    }
    }catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}

export const updateUser=async(req,res)=>{
    try {
        
        const id=req.params.id
        const updateUser=await userModel.updateOne({_id:id},{
            $set:{
                ...req.body
            }
        })
        if(updateUser){
            return res.status(200).json({
                data:updateUser,
                message:"single user updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const Login=async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await userModel.findOne({email:email})
        if(user){
            const comparePassword=await bcrypt.compare(password,user.password)
            if(!comparePassword){
                return res.status(400).json({
                    message:"invalid Credentials"
                })
            }
            const token=jwt.sign({userData:user._id},"SECRETTOKEN")
              res.status(200).json({
                token:token,
                message:"Valid User"
            })
        }
    } catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}

export const singleUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findOne({_id:id})
        if (user) {
           return res.status(200).json({
                data: user,
                message: "single users"
            })
        }
    } catch (error) {
       return res.status(400).json({
            message: error.message
        })
    }
}