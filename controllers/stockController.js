const express = require("express");
const mongoose = require("mongoose");
const stockSchema = require("../models/stock");

const defaultReorderLevel = 10; // Default reorder level if user does not provide one

// 📢 Function to check stock levels and send alerts
const checkStockLevel = async (productId) => {
    try {
        const product = await stockSchema.findById(productId);

        if (product && product.stockQuantity <= product.reorderLevel) {
            sendAlert(product);
        }
    } catch (err) {
        console.error("Error checking stock level:", err);
    }
};

// 📢 Function to send alerts
const sendAlert = (product) => {
    console.log(`⚠️ ALERT: Stock for ${product.productName} is low! Please reorder.`);
    
    // Future improvement: Integrate Email/SMS notifications
};

// 📢 Updated stock entry function with stock level check
const stockInfo = async (req, res) => {
    try {
        const { productName, category, description, stockQuantity, reorderLevel, purchasePrice,sellingPricePerUnit,   dateAdded, lastUpdated, remarks } = req.body;
           const userId = req.user.userId;

        //    console.log(userId,"this is req.user.Id")
        // Ensure all required fields are provided
        if (!userId || !productName || !category || !stockQuantity || !purchasePrice) {
            return res.status(400).json({ message: "Required stock information is missing!" });
        }

        // Use default reorder level if none provided
        const finalReorderLevel = reorderLevel !== undefined ? reorderLevel : defaultReorderLevel;
        

        const existingStock= await stockSchema.findOne({productName});

        if(existingStock){
          
        // existingStock.stockQuantity += stockQuantity;
        existingStock.stockQuantity = Number(existingStock.stockQuantity) + Number(stockQuantity);

        existingStock.purchasePrice =purchasePrice;
        existingStock.sellingPricePerUnit =sellingPricePerUnit;
        existingStock.lastUpdated= Date.now();
        await existingStock.save();


         await checkStockLevel(existingStock._id); // Stock level check after update

            return res.status(200).json({ message: "Stock updated successfully!", stock: existingStock });



        }else{


        // Prepare new stock data
        const StockData = new stockSchema({
            userId,
            productName,
            category,
            description,
            stockQuantity,
            reorderLevel: finalReorderLevel,
            purchasePrice,
            sellingPricePerUnit,
            dateAdded,
            lastUpdated,
            remarks
        });

        // Save data to database
        await StockData.save();

        // Check stock level and send alert if needed
        checkStockLevel(StockData._id);

        return res.status(200).json({ message: "Your stock has been added successfully!" });
         }

    } catch (err) {
        console.error("Stock Information Error:", err);
        res.status(500).json({ message: "Stock Information Error!", error: err.message });
    }
};

module.exports = stockInfo;
 








