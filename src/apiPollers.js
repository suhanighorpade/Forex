const axios = require("axios");
const db=require("./db/mongoose.js");

const keys=["61a7a85762msh29366a82b682240p1ff543jsn24c7859afdea","fd8f0888f2msh9c9263f1bf8ae26p1785f1jsn277df2de4d84","c794e25a42msh9e03e4287bb8fe3p199cdejsn887ac828abf5"]
const currencies=["EUR","USD","INR"]
const saveCurency= require("./utils/saveCurrency")


const getData=async ()=>{
  let data={}
    for(let from of currencies){
      for(let to of currencies){
        
        for(let key of keys){
          try{
            let res= await axios({
              "method":"GET",
              "url":"https://alpha-vantage.p.rapidapi.com/query",
              "headers":{
              "content-type":"application/octet-stream",
              "x-rapidapi-host":"alpha-vantage.p.rapidapi.com",
              "x-rapidapi-key":key,
              "useQueryString":true
              },"params":{
              "function":"CURRENCY_EXCHANGE_RATE",
              "to_currency":to,
              "from_currency":from
              }
              })
              console.log(res.data)
              console.log(key)
              res=res.data;
              data[`${from}${to}`]={
                ask:res['Realtime Currency Exchange Rate']['9. Ask Price'],
                bid:res['Realtime Currency Exchange Rate']['8. Bid Price'],
                rate:res['Realtime Currency Exchange Rate']['5. Exchange Rate']
              }
              console.log(data)
              await new Promise(resolve => setTimeout(resolve, 15000));
              break;
            }
            catch(e){
              console.log("Errror happened")
            }
          }
      }
    }
    data=await saveCurency("FP",data)
    console.log("finally")
    console.log(data)
}

setInterval(getData,180000);