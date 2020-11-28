const express = require("express")
const app = express.Router()
const auth = require("../middlewares/auth.js")
const User = require("../models/users")
const fp = require("../models/fp")
const {getUsers,sendNotification,getPosts} = require("../utils/sendMail")
const Rating=require("../models/ratings")


app.post("/notification",async(req,res,next)=>{
    console.log("notification call")
    console.log(req.body)
    try {
        if(req.body.notification==null){
            throw new Error("Notification cannot be empty")
        }
        var mails = await getUsers(req.body.title)
        console.log("mails" , mails)
        console.log(req.body.notification)
        for(const [key,val] of mails.entries()){
            var send = await sendNotification(val,req.body.notification)
            console.log(val)
             var user =  await User.findOne({
                 email : val
             })
             if(user!=null){
                user.notifications = [...user.notifications,req.body.notification]
                user = await user.save()
             }
          }
          var provider = await fp.findOne({
            title: req.body.title
             })
          console.log(provider)
          var posts = provider.notifications
          console.log(typeof(posts))
          provider.notifications=[...posts,req.body.notification]
          await provider.save()
          res.send(provider.notifications)
          
    } catch (error) {
        console.log(error)
          return next({
            message:error.message
        })
    }
})

app.get("/notifications/:title",async (req,res,next)=>{
    try{
        var prof = await fp.findOne({title : req.params.title})
        console.log(prof)
        console.log(prof.notifications)
        res.send(prof.notifications)
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:e.message
        })
    }
})



var getOverallRating = function(fpsss,star){
    totaluser_1 = fpsss.rating.get("1")
    totaluser_2 = fpsss.rating.get("2")
    totaluser_3 = fpsss.rating.get("3")
    totaluser_4 = fpsss.rating.get("4")
    totaluser_5 = fpsss.rating.get("5")
    avgrating = (totaluser_1*1 +totaluser_2*2 + totaluser_3*3+ totaluser_4*4+totaluser_5*5+star)/(totaluser_1+totaluser_2+totaluser_3+totaluser_4+totaluser_5+1)

    return Math.round(avgrating)
};

async function set_rating_star(fptitle,star)
{
    var fpsss= await fp.findOne({title : fptitle})
   
    star = star.toString()
    currentrating = fpsss.rating.get(star) 
    fpsss.rating.set(star,currentrating+1);
    fpsss.stars = getOverallRating(fpsss,Number(star))
    await fpsss.save();
}

app.post("/ratings/:title",async (req,res,next)=>{
    try{
        var rating = new Rating();
        rating.username = req.body.username;
        rating.forexProvider = req.params.title;
        rating.stars = req.body.stars;
        rating.comments= req.body.comment;
        rating=await rating.save()
        await set_rating_star(title,star)
        res.send(rating)
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

app.post("/follow/:title",async (req,res,next)=>{
    try {
        var prof = await fp.findOne({title : req.params.title})
        prof.users.forEach(mail => {
            if(mail = req.body.mail)
                res.send("Already Following")
        });
        prof.users = [...prof.users,req.body.email]
        await prof.save()
        console.log(prof.users)
        res.send("Followed")
    } catch (e) {
        return next({
            status: 400,
            message:e.message
        })
    }
})

module.exports = app;