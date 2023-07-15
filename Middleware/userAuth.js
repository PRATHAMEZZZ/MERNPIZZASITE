import jwt from "jsonwebtoken";

export const Authenticate=(req,res,next)=>{
    try {
        const{authorization}=req.headers
        if(!authorization) throw new Error("Token Needed")
        const verifyToken=jwt.verify(authorization,"SECRETTOKEN")
        if(!verifyToken) throw new Error("User doesnt Exist")
        req.users=verifyToken
        console.log(verifyToken)
        next()
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}