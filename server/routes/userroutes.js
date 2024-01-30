const express=require("express");
const router=express.Router();
const Register=require("../controllers/user-controller");

router.route("/register").post(Register);
module.exports=router;