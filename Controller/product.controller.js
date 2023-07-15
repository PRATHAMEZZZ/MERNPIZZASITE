import multerFunc from "../Utils/multerFunc";
import fs from "fs"
import productModel from "../Model/product.model";

export const addProduct=(req,res)=>{
    try {
        const upload=multerFunc("./Images/ProductImages").single("productImage")
        upload(req,res,async function(err){

            const{type,productName,productDescription,categoryId,price}=req.body
            const productImage=req.file.filename

            const addProd=await productModel.create({
                type:type,
                productName:productName,
                productDescription:productDescription,
                productImage:productImage,
                categoryId:categoryId,
                price:price
            })
            if(addProd){
                return res.status(200).json({
                    product:addProd,
                    message:"Product Added"
                })
            }
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}

export const getProduct=async(req,res)=>{
    try {
        const allProducts=await productModel.find().populate("categoryId")
        if(allProducts){
            return res.status(200).json({
                data:allProducts,
                message:"All Products"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}


export const delProduct=async(req,res)=>{
    try {
        const id=req.params.id
        const findProd=await productModel.findById(id)
        const deleteProd=await productModel.deleteOne({_id:id})
        if(deleteProd.acknowledged){
            if(fs.existsSync(`./Images/ProductImages/${findProd.productImage}`)){
            }
            return res.status(200).json({
                message:"Product deleted"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}


export const updateProduct=async(req,res)=>{
    const uploadFile=multerFunc("./upload").single("productImage")
    uploadFile(req,res,async function(err){
        try {
            
            const id=req.params.id
            const existData= await productModel.findOne({_id:id})
            let imageName=existData.productImage
                if(req.file!=undefined){
                    imageName=req.file.filename
                    if(fs.existsSync(`./Images/ProductImages${existData.productImage}`)){
                        fs.unlinkSync(`./Images/ProductImages${existData.productImage}`)
                    }
                }
            
            const updateCat=await productModel.updateOne({_id:id},{
                $set:{
                    ...req.body,
                    productImage:imageName
                }
            })
            if(updateCat){
                res.status(200).json({
                    data:updateCat,
                    message:"updated"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message:error.message
            })
        }
    })

}


export const productByCategory=async(req,res)=>{
    try {
        const id=req.params.id
        const findByCat=await productModel.find({categoryId:id}).populate("categoryId")
        if(findByCat){
            res.status(200).json({
                data:findByCat,
                message:"product by category "
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}