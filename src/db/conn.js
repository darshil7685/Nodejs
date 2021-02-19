const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dynamic",{
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection successful");
}).catch((error)=>{
    console.log("Connection not successful",error);
})