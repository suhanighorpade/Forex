const express = require("express")
const app = express.Router()
const fetch = require('node-fetch');
const saveCurrency = require("../utils/saveCurrency")
const Currency = require("../models/currencies")
app.get("/fcs", async (req, res, next) => {
    console.log(`fcs`)
    const url = `https://fcsapi.com/api-v3/forex/latest?symbol=EUR/USD,USD/INR,EUR/INR&access_key=sNcOJCq5CLgIj1M5copiO1qM`
    var data = await fetch(url);
    var jsonData = await data.json();
    console.log(jsonData)
    try {
        prof = await saveCurrency(req.body.title,jsonData)
        res.send(prof)
    }
    catch (e) {
        console.log(e)
        return next({
            status: 400,
            message: e.message
        })
    }
})

app.get("/allCurrencies", async (req, res, next) => {
    try {
        var currencies = await Currency.find().sort({"createdAt":-1})
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