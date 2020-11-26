const mongoose = require("mongoose");
const alertSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    rate:{
        type:mongoose.SchemaTypes.Number,
        required: true
    },
    currency:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    completed:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    },
    bidask:{
        type:mongoose.SchemaTypes.String,
        default:"bid"
    },
    trader:{
        type:mongoose.SchemaTypes.ObjectId,
        
    },
    saved:{
        type:mongoose.SchemaTypes.Number
    },
    seen:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    }
}, { timestamps: { createdAt: true, updatedAt: true } });


const Alert = mongoose.model('Alert', alertSchema);

module.exports= Alert;