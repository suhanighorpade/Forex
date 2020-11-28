const express= require("express")
const cors=require("cors")
const app= express();

app.use(cors())
const  errorHandler= require("./middlewares/errorHandlers")
const userRouter=require("./routers/users")
const ForexProfileRouter=require("./routers/fp")
const CurrencyRouter = require("./routers/currency")
const AlertRouter=require("./routers/alerts")
const db=require("./db/mongoose.js");
const utilityRouter = require("./routers/features")

app.use(express.json())

app.use(userRouter)
app.use(ForexProfileRouter)
app.use(utilityRouter)
app.use(CurrencyRouter)
app.use(AlertRouter)

app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});
  
app.use(errorHandler);
const port=process.env.PORT||8080

app.listen(port,()=>{
	console.log(`Node server started on ${port} port`)
	console.log(`Server started on port http://localhost:${port}/`)
})
