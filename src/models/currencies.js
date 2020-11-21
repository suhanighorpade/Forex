const mongoose = require("mongoose");
const fp= require("./fp")

const currencySchema = new mongoose.Schema({
    forexProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fp',
        required: true
    },
    title : mongoose.Schema.Types.String,
    USDEUR:[],
    USDINR:[],
    EURINR:[]
}, { timestamps: { createdAt: true, updatedAt: true } }); 

const Currency = mongoose.model('Currency', currencySchema);

module.exports= Currency;