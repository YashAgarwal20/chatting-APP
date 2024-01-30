const User=require("../models/use-model");

const Register=async(req,res,next)=>
{
    try {
        const {username,email,password}=req.body;
    const isusernameExist=await User.findOne({username});
    if(isusernameExist)
    {
        return res.json({message:"User already exixst",status:false});
    }
    const isemailExist=await User.findOne({email});
    if(isemailExist)
    {
        return res.json({message:"Email already exixst",status:false});
    }

    const data=await User.create({username,email,password});
    delete data.password;
    res.json({status:true,messge:data});
    } catch (error) {
        next(error);
    }
    

}
module.exports=Register;