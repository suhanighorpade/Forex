const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
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
    }
}, {
    timestamps: true,
})


const fp = new mongoose.model("fp", schema)

module.exports = fp