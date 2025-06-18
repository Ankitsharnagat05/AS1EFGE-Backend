const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const saleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔥 Add userId to make data user-specific
    customerName: { type: String, default: "Walk-in Customer" },
    contactNumber: { type: String, optional: true },

    productsSold: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
        productName: { type: String, required: true },
        quantitySold: { type: Number, required: true, min: 1 },
        sellingPricePerUnit: { type: Number, required: true }
    }],

    paymentMethod: { type: String, enum: ["Cash", "Card", "UPI", "Bank Transfer"], required: true },
    dateSold: { type: Date, default: Date.now },
    status: { type: String, enum: ["Completed", "Pending", "Refunded"], default: "Completed" },
    remarks: { type: String, optional: true },
    totalPrice: { type: Number, required: true, default: 0 }
});

saleSchema.pre("save", function (next) {
    this.totalPrice = this.productsSold.reduce((total, product) => {
        return total + (product.quantitySold * product.sellingPricePerUnit);
    }, 0);
    next();
});

const Sales = mongoose.model("sales", saleSchema);
module.exports = Sales;
