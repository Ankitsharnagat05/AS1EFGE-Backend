 const express=require("express");
const mongoose=require("mongoose");
const {Authregistration,AuthLogin}=require("../controllers/userController");
const SingRouter=express.Router();


SingRouter.route("/registration").post(Authregistration);

SingRouter.route("/login").post(AuthLogin);


module.exports=SingRouter;

 