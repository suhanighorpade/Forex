const express= require("express")
const app= express.Router()
const auth=require("../middlewares/auth.js")
const User=require("../models/users")
const Rating=require("../models/ratings")
const Alerts = require("../models/alert")
const Alert = require("../models/alert")
const Currency= require("../models/currencies")



app.post("/alerts",auth,async (req,res, next)=>{
    try{
        var user=req.user
        let rate= await Currency.find({}).sort({createdAt:-1}).limit(1).exec()
        rate=rate[0]
        let saved=Math.max(Number(req.body.rate)-Number(rate[req.body.currency][req.body.bidask]),0)
        saved=saved*Number(req.body.ammount)
        let alert= new Alert({...req.body,user:user._id,saved})
        alert = await alert.save()
        res.send(alert)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.get("/alerts",auth,async (req,res, next)=>{
    try{
        var user=req.user
        let alerts= await Alert.find({user:user._id})
        let ans=[];
        for(let alert of alerts)
        {
            if(alert.completed==true&&alert.seen==false)
                ans.push({...alert.toJSON(),seen:true})
            else
            ans.push({...alert.toJSON()})
        }
        res.send(ans)
        alerts.forEach(async(alert)=>{
            if(alert.completed==true&&alert.seen==false)
                {
                    alert.seen=true;
                    await alert.save()
                } 
        })
        
        
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})
app.delete("/alerts/:id",auth,async (req,res,next)=>{
    try{
        let alerts= await Alerts.deleteMany({_id:req.params.id})
        res.send(alerts)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})
app.delete("/alerts",auth,async (req,res,next)=>{
    try{
        let alerts= await Alerts.deleteMany({})
        res.send(alerts)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

module.exports=app