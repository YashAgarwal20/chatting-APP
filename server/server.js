
const express=require("express");
const cors=require("cors");
const app=express();
const connectionDb=require("./utils/connection");
require("dotenv").config();
app.get("/",(req,res)=>
{
    res.send("hello");
})

connectionDb().then(
    app.listen(process.env.PORT,()=>
    {
        console.log(`server running on port ${process.env.PORT}`);
    })
)

