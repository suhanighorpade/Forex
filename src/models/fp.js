const mongoose = require("mongoose")
const schema = mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    rating: {
        type: mongoose.Schema.Types.String
    },
    about:{
        type: mongoose.Schema.Types.String
    },
    contact:{
        type: mongoose.Schema.Types.String,
    },
    location:{
        type: mongoose.Schema.Types.String,
    }
}, {
    timestamps: true,
})


const fp = new mongoose.model("fp", schema)

module.exports = fp