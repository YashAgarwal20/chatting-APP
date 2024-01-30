const mongoose=require("mongoose");

const connectionDb=async()=>
{
    const connection=await mongoose.connect("mongodb://127.0.0.1:27017/chat-site");
    console.log("database connection success");

}
module.exports=connectionDb;