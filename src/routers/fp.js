const express = require("express")
const app = express.Router()
const auth = require("../middlewares/auth.js")
const User = require("../models/users")
const fp = require("../models/fp")
const fetch = require('node-fetch');
const Currency= require("./../models/currencies")
const saveCurrency = require("./../utils/saveCurrency")

app.get("/allforexProviders", async (req, res, next) => {
    
    try {
        var profiles = await fp.find()
        let last=parseInt(req.query.limit)||20
        let ans=[]
        for(var profile of profiles){
            let data=await Currency.find({forexProvider:profile._id}).sort({createdAt:-1}).limit(last).exec()
            
            console.log(profile)
            ans.push({...profile.toJSON(),rates:data})
        }
        res.send(ans)
    }
    catch (e) {
        console.log(e)
        return next({
            status: 404,
            message: e.message
        })
    }
})



app.get("/getratings/:title",function (req, res) {
    fp.findOne({title : req.params.title},function (err, fpsss) {
        if(err){
            console.log("Can not retrive ...");
            console.log(err);
        }else
        {
            totaluser_1 = fpsss.rating.get("1")
            totaluser_2 = fpsss.rating.get("2")
            totaluser_3 = fpsss.rating.get("3")
            totaluser_4 = fpsss.rating.get("4")
            totaluser_5 = fpsss.rating.get("5")


            avgrating = (totaluser_1*1 +totaluser_2*2 + totaluser_3*3+ totaluser_4*4+totaluser_5*5)/(totaluser_1+totaluser_2+totaluser_3+totaluser_4+totaluser_5)
            console.log(Math.round(avgrating))
        }
    });
});

app.get("/setratings/:title/:rate",function (req, res) {
    fp.findOne({title : req.params.title},function (err, fpsss) {
        if(err){
            console.log("Can not retrive ...");
            console.log(err);
        }else
        {
            rate = req.params.rate
            currentrating = fpsss.rating.get(rate) 
            console.log(currentrating)
            console.log(typeof(currentrating))
            fpsss.rating.set(rate,currentrating+1);
            fpsss.save();
        }
    });
});

app.get("/forexProviders/:title", async (req, res, next) => {
    console.log(req.body)
    try {
        var profile = await fp.findOne({
            title : req.params.title
        })
        let last=parseInt(req.query.limit)||20
        let data=await Currency.find({forexProvider:profile._id}).sort({createdAt:-1}).limit(last).exec()
        res.send({...profile.toJSON(),rates:data})
        
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

app.post("/forexProviders/:title/latestRates",async (req,res,next)=>{
    try{
        var update= await saveCurrency(req.params.title,req.body)
        res.send(update)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})





module.exports = app;