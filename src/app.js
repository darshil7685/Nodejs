const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const { registerPartials} = require("hbs");
require("./db/conn");
const User=require("./models/user.js");

const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dict/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dict/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dict")));
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);


app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/contact",async(req,res)=>{
    try{
        //res.send(req.body);
        const  userData= new User(req.body);
        await userData.save();
        res.status(201).render("index");

    }catch(error){
        res.status(500).send(Error);
    }

});

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});