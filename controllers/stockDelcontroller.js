const express = require("express");
const stockSchema = require("../models/stock");

const delStock = async (req, res) => {
    try {
        const userId = req.user.userId; // ✅ Ensure user-specific stock deletion
        const { productName, quantityToDelete } = req.body; // ✅ Extract productName & quantityToDelete

        // ✅ Find stock based only on productName & userId
        const stockItem = await stockSchema.findOne({ productName, userId });

        if (!stockItem) {
            return res.status(404).json({ message: "Stock item not found or does not belong to you!" });
        }

        if (quantityToDelete <= 0) {
            return res.status(400).json({ message: "Invalid quantity to delete!" });
        }

        if (stockItem.stockQuantity > quantityToDelete) {
            stockItem.stockQuantity -= quantityToDelete;
            stockItem.lastUpdated = new Date();
            await stockItem.save();

            return res.status(200).json({
                message: `Stock quantity updated! Remaining stock: ${stockItem.stockQuantity}`,
            });
        } else {
            // 🔥 If stock quantity is equal or less, delete the stock
            await stockItem.deleteOne();
            return res.status(200).json({ message: `Stock item '${stockItem.productName}' completely removed!` });
        }
    } catch (err) {
        console.error("🚨 Stock Deletion Error:", err);
        res.status(500).json({ message: "Stock Deletion Error", error: err.message });
    }
};

module.exports = delStock;
