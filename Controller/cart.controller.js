import cartModel from "../Model/cart.model"
import proModel from "../Model/product.model"


export const addToCart=async(req,res)=>{
    try {
        const {product}=req.body
        const user=req.users.userData
        console.log(req.users)
        const proData=await proModel.findOne({_id:product})
        if(proData){
            const existProduct=await cartModel.findOne({user:user,product:product})
            if (existProduct) {
                const updateCart = await cartModel.updateOne({ _id:existProduct._id }, {
                    $set: {
                        quantity: existProduct.quantity + 1
                    }
                })
                if(updateCart.acknowledged){
                    return res.status(201).json({
                        message:"quantity updated"
                    })
                }
        }

        const data=await new cartModel({
            user:user,
            product:product,
            name:proData.productName,
            price:proData.price,
            quantity:1,
            image:proData.productImage
        })
        data.save()
        if(data){
            return res.status(201).json({
                data:data,
                message:"product added to cart",
            })
        }
        }
    } catch (error) {
        return res.status(201).json({
            message:error.message
        })
    }
}

export const getCart=async(req,res)=>{
    try {
        
        const user=req.users.userData
        const data=await cartModel.find({user:user}).populate("product")
        if(data){
            return res.status(200).json({
                data:data,
                message:"all products from cart"
            })
        }
    } catch (error) {
        return res.status(200).json({
            message:error.message
        })
    }
}

export const updateQty=async(req,res)=>{
    const id=req.params.id
    const user=req.users.userData
    const{type}=req.body
    const data=await cartModel.findOne({user:user,_id:id})
    console.log(data)
    let quantity=data.quantity
    console.log(quantity)
    if(type=="inc"){
        if(quantity<10){
            quantity=quantity+1
        }
    }
    else{
        quantity=quantity-1
    }
    const updateData=await cartModel.updateOne({user:user,_id:id},{
        $set:{
            quantity:quantity
        }
    })
    if(updateData){
        return res.status(200).json({
            message:"quantity updated"
        })
    }

}


export const delCart=async(req,res)=>{
        try {
            const id=req.params.id
            const deleteProd=await cartModel.deleteOne({_id:id})
            if(deleteProd)
                return res.status(200).json({
                    message:"Cart deleted"
                })
        } catch (error) {
            return res.status(400).json({
                message:error.message
            })
        }
}