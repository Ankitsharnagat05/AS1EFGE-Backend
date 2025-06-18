const express=require("express");
const TotalAmtPrice=require("../controllers/totalAmtcallculate");
const amtrouter=express.Router();
const AuthTokenJwt=require("../middleware/AuthTokenJwt");

amtrouter.route("/totalAmt").get(AuthTokenJwt,TotalAmtPrice);

module.exports=amtrouter;

