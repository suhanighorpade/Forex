const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;
mongoose.connect("mongodb+srv://email:password@cluster0-oindo.mongodb.net/forex?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
var db = mongoose.connection;
module.exports = db;
