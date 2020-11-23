const express = require("express")
const app = express.Router()
const fetch = require('node-fetch');
const saveCurrency = require("../utils/saveCurrency")
const Currency = require("../models/currencies")


app.get("/allCurrencies", async (req, res, next) => {
    try {
        var currencies = await Currency.find().sort({"title":-1})
        res.send(currencies)
    }
    catch (e) {
        return next({
            status: 404,
            message: e.message
        })
    }
})

app.delete("/allCurrencies", async (req,res,next)=>{
    try{
        var currencies= await Currency.deleteMany()
        res.send(currencies)
    }
    catch(e){
        return next({
            status:500,
            message:e.message
        })
    }
})

module.exports = app;