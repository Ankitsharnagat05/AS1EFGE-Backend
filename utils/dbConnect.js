const express=require("express");
const mongoose=require("mongoose");


// console.log("this is enc file ",process.env.MONGO_URL);

const URI=process.env.MONGO_URL;


const database=async(req,res)=>{
   
    try{
        
        await mongoose.connect(URI);
        console.log("database connected .....!");

    }catch(err){
        console.log("database URI was not connected ....!");
        console.log(err);
        
    }
}

module.exports=database;