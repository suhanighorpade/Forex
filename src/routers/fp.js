const express = require("express")
const app = express.Router()
const auth = require("../middlewares/auth.js")
const User = require("../models/users")
const fp = require("../models/fp")
const fetch = require('node-fetch');

app.get("/allforexProviders", async (req, res, next) => {
    console.log(req.body)
    try {
        var profiles = await fp.find()
        res.send(profiles)
    }
    catch (e) {
        return next({
            status: 404,
            message: e.message
        })
    }
})
app.get("/forexProvider", async (req, res, next) => {
    console.log(req.body)
    try {
        var profile = await fp.findOne({
            title : req.body.title
        })
      
    }
    catch (e) {
        return next({
            status: 404,
            message: e.message
        })
    }
})
app.post("/forexProvider", async (req,res, next)=>{
    var prof= new fp(req.body)
    try{
        prof=await prof.save()
        console.log("saved fp")
        res.send(prof)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})
app.patch("/forexProvider" ,async (req,res,next)=>{
    try{
        var fp =req.fp
        const keys= Object.keys(req.body)
        keys.forEach((key)=>{
            if(req.body[key])
                fp[key]=req.body[key]
        })
        fp=await fp.save()
        res.send(fp)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.delete("/forexProviders", async (req,res,next)=>{
    try{
        var users= await fp.deleteMany()
        res.send(users)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})



module.exports = app;