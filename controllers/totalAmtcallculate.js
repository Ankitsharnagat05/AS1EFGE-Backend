const express = require("express");
const Sales = require("../models/sales");
const mongoose = require("mongoose");

const TotalAmtPrice = async (req, res) => {
    try {
        console.log("TotalAmtPrice function triggered"); // Debug log

        // Ensure user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "Unauthorized: User ID missing or token invalid" });
        }

        const userId = req.user.userId;
        console.log("Calculating sales for user:", userId); // Debug log

        // Convert `userId` to MongoDB ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Aggregate total sales amount for the specific user
        const totalSales = await Sales.aggregate([
            { $match: { userId: userObjectId } }, // ✅ Correctly matching `ObjectId`
            { $group: { _id: null, totalPrice: { $sum: "$totalPrice" } } } // Summing user's total sales
        ]);

        console.log("Aggregation result:", totalSales); // Debug log

        // Determine total amount or default to 0
        const totalAmount = totalSales?.[0]?.totalPrice || 0;

        return res.status(200).json({ totalAmount });

    } catch (err) {
        console.error("Error fetching user-specific total sales amount:", err);
        return res.status(500).json({ error: err.message });
    }
};

module.exports = TotalAmtPrice;
