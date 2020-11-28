
const mongoose = require("mongoose")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const schema = mongoose.Schema({
    email : {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password :{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    stars:{
        type: mongoose.Schema.Types.String
    },
    rating: Map,
    mapOfString: {
        type: Map,
        of: Number
    },
    about:{
        type: mongoose.Schema.Types.String
    },
    contact:{
        type: mongoose.Schema.Types.String,
    },
    location:{
        type: mongoose.Schema.Types.String,
    },
    users :[
    ],
    notifications : [
    ],
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
        }
    ]
}, {
    timestamps: true,
})

schema.pre('save', async function(next){
	var user =this
	if(user.isModified("password")){
		user.password= await bcrypt.hash(user.password,8)
	}
	console.log("running")
	next()
})
schema.methods.generateToken= async function(){
    const user=this
    const id=user._id;
    const token = await jwt.sign({id},"secretkey")
    user.tokens=user.tokens.concat({token})
	await user.save()
    return token
}
const fp = new mongoose.model("fp", schema)

module.exports = fp