const axios = require("axios");
const db=require("./db/mongoose.js");

const keys=["095e028ce8msh2b3c0600a55dc3ap1d637djsn4803a3011524","d88cf14e1fmsh4d537c72fbca661p1028a6jsn00016c33607e","3042cf0238msh76b721a88ab66cfp177837jsn4470cfe205b4","b6f149ec86mshf0064919babf817p1e5232jsnadff978ad134","53bab156c5mshaadb713c58c0a34p164d38jsn24e7f2686dc8","61a7a85762msh29366a82b682240p1ff543jsn24c7859afdea","fd8f0888f2msh9c9263f1bf8ae26p1785f1jsn277df2de4d84","c794e25a42msh9e03e4287bb8fe3p199cdejsn887ac828abf5","fb3e0b020fmsh19af2babc0ad5ffp130cd7jsn625c85e757f5"]
const currencies=["EUR","USD","INR"]
const saveCurency= require("./utils/saveCurrency")


const getData=async ()=>{
  let data={}
    for(let from of currencies){
      for(let to of currencies){
        if(to==from)
          continue
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
              await new Promise(resolve => setTimeout(resolve, 8000));
              break;
            }
            catch(error){
              console.log("error")
              //await new Promise(resolve => setTimeout(resolve, 15000));
            }
          }
      }
    }
    data=await saveCurency("FP",data)
    console.log("finally")
    console.log(data)
}
getData()
setInterval(getData,60000);