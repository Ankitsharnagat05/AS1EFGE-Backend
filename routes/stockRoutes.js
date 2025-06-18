const express=require("express");
const mongoose=require("mongoose");
const stockRouter=express.Router();
const stockInfo=require("../controllers/stockController");
const stockShow=require("../controllers/stockEntryShow");
const AuthTokenJwt=require("../middleware/AuthTokenJwt");

stockRouter.route("/stockinfo").post(AuthTokenJwt,stockInfo);
stockRouter.route("/stockentries").get(AuthTokenJwt,stockShow);

module.exports=stockRouter;