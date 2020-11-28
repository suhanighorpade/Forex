const express= require("express")
const app= express.Router()
const auth=require("../middlewares/auth.js")
const User=require("../models/users")
const Rating=require("../models/ratings")
const fp = require("../models/fp")

app.post("/signup", async (req,res, next)=>{
    var user= new User(req.body)
    try{
        user=await user.save()
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
    console.log(req)
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
/*var getOverallRating = function(fpsss,star){
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

app.get("/ratings/:username/:title/:stars/:comments?",async (req,res,next)=>{
    try{
        var rating = new Rating();
        var title = req.params.title;
        var star = req.params.stars;
        rating.username = req.params.username;
        rating.forexProvider = title;
        rating.stars = star;
        if(req.params.comments)
        {
            rating.comments= req.params.comments;
        }
        rating=await rating.save()
        await set_rating_star(title,star)
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
        for await (const doc of ratings) {
            console.log(doc); // Prints documents one at a time
          }
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:e.message
        })
    }
})*/

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


module.exports=app;