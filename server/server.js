require("dotenv").config();
const express=require("express");
const cors=require("cors");
const app=express();
const userRoutes=require("./routes/userroutes");
const connectionDb=require("./utils/connection");



const corsOptions={
    origin:'*',
    method:"GET,POST,PUT,DELETE,HEAD",
    credentials:true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth",userRoutes);

connectionDb().then(
    app.listen(process.env.PORT,()=>
    {
        console.log(`server running on port ${process.env.PORT}`);
    })
)

