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
        res.send(profile)
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
app.patch("/forexProvider/:title" ,async (req,res,next)=>{
    try {
        var keys= Object.keys(req.body)
        for(key in keys){
            if(!req.body[keys[key]])
                delete req.body[keys[key]]
        }
        var prof = await fp.findOne({
            title: req.params.title,
        })
        if (!prof)
            return res.status(404).send("Does not exist")
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const val = item[1];
            prof[key] = val;
        });
        await prof.save()
        res.send(prof)
    } catch (e) {
        return next({
            message: e.message
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