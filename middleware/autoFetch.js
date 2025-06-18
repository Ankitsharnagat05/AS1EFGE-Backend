const express = require("express");
const Stock = require("../models/stock");

const autoFetchProductData = async (req, res, next) => {
  try {
    // Validate that productSold is an array and contains products
      
    if (!req.body.productsSold || !Array.isArray(req.body.productsSold)) {
      console.log("🚨 ProductsSold is missing or not an array:", req.body.productsSold);
      return res.status(400).json({ message: "At least one product must be provided as an array!" });
    }

    for (const product of req.body.productsSold) {
      if (!product.productId) {
        // Search for the product in the stock database using productName
        const stockItem = await Stock.findOne({ productName: product.productName }); //name tha phayle yaa 

        if (!stockItem) {
          return res.status(400).json({ message: `Product '${product.productName}' not found in stock!` });
        }

        // Assign correct productId and selling price from Stock
        product.productId = stockItem._id;  
        product.sellingPricePerUnit = stockItem.sellingPricePerUnit;
      }
    }

    next(); // Proceed to the next middleware or controller

  } catch (err) {
    res.status(500).json({ message: "Error in autoFetchProductData!", error: err });
  }
};

module.exports = autoFetchProductData;
