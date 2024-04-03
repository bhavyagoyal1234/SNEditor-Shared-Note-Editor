const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");

const app=express();
 
const routes=require("./routes/index");



app.use(cors({
    origin:"*",
    methods:["GET","PATCH","POST","DELETE","PUT"],
    credentials:true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.urlencoded({
    extended:true,
}));

app.use(routes);


module.exports=app; 