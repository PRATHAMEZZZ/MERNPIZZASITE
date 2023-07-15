
import CategoryModel from "../Model/Category.model";
import multerFunc from "../Utils/multerFunc";
import fs from "fs"

export const AddCategory=async(req,res)=>{
    try {
        const image=multerFunc("./Images/CategoryImage").single("categoryImage")
        image(req,res,async function(err){
            console.log(req.body)
            console.log(req.file.filename)
            const{categoryName,categoryDescription}=req.body
            const categoryImage=req.file.filename
            const data=await CategoryModel.create({
                categoryName:categoryName,
                categoryImage:categoryImage,
                categoryDescription:categoryDescription,

            })
            if(data){
                return res.status(200).json({
                    message:"Category Added"
                })
            }
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}


export const getCategory=async(req,res)=>{
        try {
            const allCategories=await CategoryModel.find()
            if(allCategories){
                return res.status(200).json({
                    data:allCategories,
                    message:"Categories"
                })
            }
        } catch (error) {
            return res.status(400).json({
                message:error.message
            })
        }
}

export const delCategory=async(req,res)=>{
    try {
        const id=req.params.id
        const findCat=await CategoryModel.findById(id)
        const deleteCat=await CategoryModel.deleteOne({_id:id})
        if(deleteCat){
            if(fs.existsSync(`./Images/CategoryImage/${findCat.categoryImage}`)){
                fs.unlinkSync(`./Images/CategoryImage/${findCat.categoryImage}`)
            }
            return res.status(200).json({
                message:"Category deleted"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}

export const updateCat=async(req,res)=>{
    const uploadFile=multerFunc("./upload").single("categoryImage")
    uploadFile(req,res,async function(err){
        try {
            
            const id=req.params.id
            const existData= await CategoryModel.findOne({_id:id})
            let imageName=existData.categoryImage
                if(req.file!=undefined){
                    imageName=req.file.filename
                    if(fs.existsSync("/Images/CategoryImage" + existData.image)){
                        fs.unlinkSync("/Images/CategoryImage" + existData.image)
                    }
                }
            
            const{categoryName}=req.body
            const updateCat=await CategoryModel.updateOne({_id:id},{
                $set:{
                    ...req.body,
                    categoryImage:imageName
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