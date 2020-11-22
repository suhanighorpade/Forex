const express = require("express")
const app = express.Router()
const auth = require("../middlewares/auth.js")
const User = require("../models/users")
const fp = require("../models/fp")
const {getUsers,sendNotification} = require("../utils/sendMail")


app.post("/notification",async(req,res,next)=>{
    try {
        if(req.body.notification==null){
            throw new Error("Notification cannot be empty")
        }
        var mails = await getUsers(req.body.title)
        console.log("mails" , mails)
        console.log(typeof(mails))
        for(const [key,val] of mails.entries()){
            var send = sendNotification(val,req.body.notification)
          }
          res.send("Notification sent")
          
    } catch (error) {
        console.log(error+"err")
          return next({
            message:error.message
        })
    }
})

module.exports = app;