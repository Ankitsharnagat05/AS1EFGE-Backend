const express=require("express");
const {deleteOnesaleRecord,deleteAllUserSales}=require("../controllers/saleRecordDelete");
const saleDeleteRouter=express.Router();
const AuthTokenJwt=require("../middleware/AuthTokenJwt");

saleDeleteRouter.route("/sales/:id").delete(AuthTokenJwt,deleteOnesaleRecord);
saleDeleteRouter.route("/salesdelete").delete(AuthTokenJwt,deleteAllUserSales);



module.exports=saleDeleteRouter;
