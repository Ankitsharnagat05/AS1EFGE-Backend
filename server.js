require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const port=process.env.PORT|| 4000;
const salesRouter=require("./routes/salesRouter");
const stockRouter=require("./routes/stockRoutes");
const database=require("./utils/dbConnect");
const SingRouter=require("./routes/userRoutes");
const delRouter=require("./routes/delRoutes");
const saleDeleteRouter=require("./routes/saleDeleteRoutes");
const amtrouter=require("./routes/TotalAmtGet");
const cors=require("cors");
const app=express();


const corsOptions={
    origin:["http://localhost:5173","https://as1edge.netlify.app/"],
    method:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));


app.use("/api/data",salesRouter)
app.use("/api/data",stockRouter);
app.use("/api/data",SingRouter);
app.use("/api/data",delRouter);
app.use("/api/data",saleDeleteRouter);
app.use("/api/data",amtrouter);

database().then(()=>{
app.listen(port ,()=>{
    console.log(`this is your current location port ${port}`)
})

})


