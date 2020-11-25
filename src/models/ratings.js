const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    username:{
        type:mongoose.SchemaTypes.String,
        required: true
    },

    forexProvider: {
        type:mongoose.SchemaTypes.String,
        required: true
    },
    stars:{
        type:mongoose.SchemaTypes.String,
        required: true
    },
    comments:{
        type:mongoose.SchemaTypes.String,
    },
    
}, { timestamps: { createdAt: true, updatedAt: true } });


const Rating = mongoose.model('Rating', ratingSchema);

module.exports= Rating;