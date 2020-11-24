const express = require("express")
const app = express.Router()
const auth = require("../middlewares/auth.js")
const User = require("../models/users")
const fp = require("../models/fp")
const {getUsers,sendNotification} = require("../utils/sendMail")
const Rating=require("../models/ratings")


app.post("/notification",async(req,res,next)=>{
    try {
        if(req.body.notification==null){
            throw new Error("Notification cannot be empty")
        }
        var mails = await getUsers(req.body.title)
        console.log("mails" , mails)
        console.log(typeof(mails))
        for(const [key,val] of mails.entries()){
            var send = await sendNotification(val,req.body.notification)
             var user =  await User.findOne({
                 email : val
             })
             user.notifications = [...user.notifications,req.body.notification]
             user = await user.save()
            
          }
          res.send("Notification sent")
          
    } catch (error) {
        console.log(error+"err")
          return next({
            message:error.message
        })
    }
})


var getRating = function(fpsss){
        totaluser_1 = fpsss.rating.get("1")
        totaluser_2 = fpsss.rating.get("2")
        totaluser_3 = fpsss.rating.get("3")
        totaluser_4 = fpsss.rating.get("4")
        totaluser_5 = fpsss.rating.get("5")
        avgrating = (totaluser_1*1 +totaluser_2*2 + totaluser_3*3+ totaluser_4*4+totaluser_5*5)/(totaluser_1+totaluser_2+totaluser_3+totaluser_4+totaluser_5)
        console.log(Math.round(avgrating))
        return Math.round(avgrating)
};
/*
app.post("/setRating/:title", async(req,res,next)=> {
    try {
       var fpsss= await fp.findOne({title : req.params.title})
       console.log(fpsss.rating)
       rate = req.body.rate
       currentrating = fpsss.rating.get(rate) 
       fpsss.rating.set(rate,currentrating+1);
       fpsss.stars = getRating(fpsss)
       console.log(fpsss.rating)
       await fpsss.save();
       res.send(fpsss)
    } catch (e) {
        return next({
            status: 404,
            message: e.message
        })
    }
});*/
var getOverallRating = function(fpsss,star){
    totaluser_1 = fpsss.rating.get("1")
    totaluser_2 = fpsss.rating.get("2")
    totaluser_3 = fpsss.rating.get("3")
    totaluser_4 = fpsss.rating.get("4")
    totaluser_5 = fpsss.rating.get("5")
    avgrating = (totaluser_1*1 +totaluser_2*2 + totaluser_3*3+ totaluser_4*4+totaluser_5*5+star)/(totaluser_1+totaluser_2+totaluser_3+totaluser_4+totaluser_5+1)
    console.log(Math.round(avgrating))
    return Math.round(avgrating)
};

async function set_rating_star(fptitle,star)
{
    var fpsss= await fp.findOne({title : fptitle})
    console.log(fpsss.rating)
    currentrating = fpsss.rating.get(star) 
    fpsss.rating.set(star,currentrating+1);
    fpsss.stars = getOverallRating(fpsss,Number(star))
    console.log(fpsss.rating)
    await fpsss.save();
}

app.post("/ratings/:title",async (req,res,next)=>{
    try{
        var rating = new Rating();
        var title = req.params.title;
        var star = req.body.stars;
        var comment = req.body.comment;
        rating.username = req.body.username;
        rating.forexProvider = title;
        rating.stars = star;
        if(comment)
        {
            rating.comment= comment;
        }
        rating=await rating.save()
        await set_rating_star(title,star)
        res.send("Thank you for the review !")
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:e.message
        })
    }
})


app.get("/allratings/:title",async (req,res,next)=>{
    try{
        var ratings = await Rating.find({forexProvider : req.params.title})
        res.send(ratings)
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:e.message
        })
    }
})

module.exports = app;