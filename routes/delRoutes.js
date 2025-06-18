const express=require("express");
const delStock=require("../controllers/stockDelcontroller");
const AuthTOkenJwt=require("../middleware/AuthTokenJwt");
const delRouter=express.Router();

 
delRouter.route("/stockdelete").delete(AuthTOkenJwt,delStock);

module.exports=delRouter;


