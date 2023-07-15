import express from "express"
import { getUsers,addUser, getUser,delUser,updateUser, Login, singleUser } from "../Controller/user.controller"
const route=express.Router()

route.post("/addUser",addUser)
route.post("/login",Login)

route.get("/getUsers",getUsers)
route.get("/getUser/:id",getUser)
route.delete("/delUser/:id",delUser)
route.patch("/updateUser/:id",updateUser)
route.get("/singleUser/:id",singleUser)



export default route
