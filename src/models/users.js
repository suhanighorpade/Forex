const mongoose = require("mongoose")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const validator=require("validator")
const fp = require("./fp")
const schema= mongoose.Schema({
    username:{
        type:"String",
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate:function(value){
            if(!validator.isEmail(value))
				throw new Error("Invalid email provided")
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        trim:true,
    },
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
        }
    ],
    isVerified:{
        type:Boolean,
        default:true
    },
    notifications:[
        
    ],
},{
	timestamps:true,
})
schema.methods.generateToken= async function(){
    const user=this
    const id=user._id;
    const token = await jwt.sign({id},"secretkey")
    user.tokens=user.tokens.concat({token})
	await user.save()
    return token
}

schema.statics.findByCredentials= async function(email, password){
    var user=await User.findOne({email})
    if(!user){
        user=await fp.findOne({email})
        console.log(user)
        if(!user)
        throw new Error("No such email in database")
    }
	const isMatch = await bcrypt.compare(password,user.password)
	if(!isMatch)
		throw new Error("password did not match")
	return user

}


//filtering
schema.methods.toJSON=function(){
	const user=this
	const userObject=user.toObject()

	delete userObject.tokens
	delete userObject.password

	return userObject
}

//midlleware to hash password whenever it is notified
schema.pre('save', async function(next){
	var user =this
	if(user.isModified("password")){
		user.password= await bcrypt.hash(user.password,8)
	}
	console.log("running")
	next()
})

schema.methods.toJSON=function(){
	const user=this
	const userObject=user.toObject()

	delete userObject.tokens
	delete userObject.password

	return userObject
}

const User= new mongoose.model("User",schema)

module.exports=User