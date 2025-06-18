const express = require("express");
const mongoose = require("mongoose");


// 📌 Stock Schema - Stores product information in inventory
const stockSchema = new mongoose.Schema({
     
    userId:{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true 
    },

    // 🔹 Name of the product (e.g., Laptop, Mobile, Headphones)
    productName: {
        type: String,
        required: true
    },

    // 🔹 Category of the product (Electronics, Grocery, Clothing, etc.)
    category: {
        type: String,
        required: true
    },

    // 🔹 Short description of the product (Specifications or details)
    description: { type: String},

    // 🔹 Number of available units in stock
    stockQuantity: { type: Number, required: true,  },

    // 🔹 Minimum stock level before reordering
    reorderLevel: { type: Number, required: true, },

    // 🔹 Purchase price (cost at which the supplier provided the product)
    purchasePrice: { type: Number, required: true },

    sellingPricePerUnit:{type:Number},

    // 🔹 Date when the product was added to stock (default: current date)
    dateAdded: { type: Date, default: Date.now },

    // 🔹 Last updated timestamp for this stock entry
    lastUpdated: { type: Date, default: Date.now },

    // 🔹 Additional notes (Special discounts, damaged stock, or other details)
    remarks: { type: String}
});

stockSchema.pre("save",function(next){
    
    this.lastUpdated=Date.now();
    next();

})

// 📌 Creating the Stock model in MongoDB
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
