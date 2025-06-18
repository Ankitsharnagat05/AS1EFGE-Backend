const express=require("express");
const mongoose=require("mongoose");
const salesRouter=express.Router();
const saleData=require("../controllers/salesController");
const autoFetchProductData=require("../middleware/autoFetch")
const SaleShow=require("../controllers/saleEntryShow");
const AuthTokenJwt=require("../middleware/AuthTokenJwt");

salesRouter.route("/sales").post(AuthTokenJwt,autoFetchProductData,saleData)
salesRouter.route("/salesentries").get(AuthTokenJwt,SaleShow);
module.exports=salesRouter;



