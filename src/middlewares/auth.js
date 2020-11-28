const jwt= require("jsonwebtoken")
const fp = require("../models/fp.js")
const User= require("../models/users.js")


const auth= async function(req,res,next){
        console.log(req.header("Authorization"))
    try{
        const token= req.header("Authorization").replace("Bearer","").trim()
        console.log(token)
        const decoded =await jwt.verify(token,"secretkey")
        console.log(decoded)
        var user=await User.findOne({_id:decoded.id, 'tokens.token':token})
        if(!user)
            {
                 user=await fp.findOne({_id:decoded.id, 'tokens.token':token})
            }
        if(!user){
            throw new Error("Token invalid")
        }
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        return next({
            status: 401,
            message: e.message
        })
    }
    
}


module.exports=auth