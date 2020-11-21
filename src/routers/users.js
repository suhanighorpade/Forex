const express= require("express")
const app= express.Router()
const auth=require("../middlewares/auth.js")
const User=require("../models/users")
app.post("/signup", async (req,res, next)=>{
    var user= new User(req.body)
    try{
        user=await user.save()
        console.log("saved")
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:e.message
        })
    }

    try{
        const token= await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})
app.post("/login", async (req,res,next)=>{
    
    try{
        
     const  user = await User.findByCredentials(req.body.email,req.body.password)
     console.log(user)
     const token = await user.generateToken()
     console.log("logged")
     res.send({user,token})
    }
    catch(e){
        //logger.error(e)
        return next({
            status: 404,
            message:e.message
        })
    }
     
})

app.post("/logout", auth,async (req,res, next)=>{

    try{
        var token =req.token
        var user=req.user
        user.tokens= user.tokens.filter((t)=>{
            t!=token
        })
        await user.save()
        res.send(user)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.post("/logoutAll", auth,async (req,res,next)=>{
    try{
        var user=req.user
        user.tokens= []
        await user.save()
        res.send(user)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.get("/users",async (req,res,next)=>{
    try{
        var users= await User.find()
        res.send(users)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})
app.delete("/users", async (req,res,next)=>{
    try{
        var users= await User.deleteMany()
        res.send(users)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})
app.get("/me", auth, async (req,res,next)=>{4
    console.log("me req")
    console.log(req)
    try{
        res.send(req.user)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})

app.get("/user/isTaken/:username",async (req,res,next)=>{
    try{    
        var user= await User.find({username:req.params.username})
        res.send({
            valid:user.length==0
        })
    }
    catch(e){
        next({
            status:500,
            message:e.message
        })
    }
})
module.exports=app;