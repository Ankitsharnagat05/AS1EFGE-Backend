const express = require("express");
const Sales = require("../models/sales");
const Stock = require("../models/stock");

const salesData = async (req, res) => {
  try {
    const { customerName, contactNumber, productsSold, paymentMethod, dateSold, remarks } = req.body;
    const userId = req.user.userId; // ✅ Fix: UserId directly token se assign hoga

    // 🔍 Validate product array
    if (!Array.isArray(productsSold) || productsSold.length === 0) {
      return res.status(400).json({ message: "At least one product must be sold!" });
    }

    // 🔄 Loop through sold products & update stock quantity
    for (const product of productsSold) {
      const stockItem = await Stock.findById(product.productId);
      if (!stockItem) {
        return res.status(400).json({ message: `Product ${product.productName} not found in stock!` });
      }

      if ((stockItem?.stockQuantity || 0) < product.quantitySold) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.productName}! Available: ${stockItem?.stockQuantity}, Requested: ${product.quantitySold}`,
        });
      }

      stockItem.stockQuantity -= product.quantitySold;
      await stockItem.save();
    }

    // 🛠 Create a new sale record linked to the user
    const data = new Sales({ userId, customerName, contactNumber, productsSold, paymentMethod, dateSold, remarks });
    await data.save();

    return res.status(200).json({ message: "Sale recorded successfully!", totalPrice: data.totalPrice });
  } catch (err) {
    console.error("Sale controller error:", err);
    res.status(500).json({ message: "Server error", err });
  }
};

module.exports = salesData;
