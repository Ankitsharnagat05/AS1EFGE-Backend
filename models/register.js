const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");


const registerSchema= new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        
            type:Number,
            required:true
        
    },
    userName:{
        type:String,
        required:true

    },
    passWord:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]


});

// console.log("this is my secret key ",process.env.JWT_SECRET)


registerSchema.methods.authTokenGenerate =async function () {
   try{
    const token = jwt.sign({ userId: this._id },process.env.JWT_SECRET);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
    }catch(err){
        throw new Error('Failed to generate and save token: ' + err);
    }
};




registerSchema.pre("save",async function (next) {
    try{
        if(this.isModified("passWord")){
            // console.log("Before Hashing:", this.passWord); // Debugging
        this.passWord = await bcrypt.hash(this.passWord, 10);
        // console.log("After Hashing:", this.passWord); // Debugging
           
        }
         next();

    }catch(err){
        next(err);
        console.log(err,"passWord are not bcrypt chake your function")
    }
    
})


const registration=new mongoose.model("registration",registerSchema);



module.exports=registration;

