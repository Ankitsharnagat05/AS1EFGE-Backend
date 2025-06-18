const express = require("express");
const stock = require("../models/stock");

const stockShow = async (req, res) => {
    try {
        const userId=req.user.userId;
        const stockShowdata = await stock.find({userId});

        if (!stockShowdata.length) {
            return res.status(404).json({ message: "No stock data found!" });
        }

        return res.status(200).json({ message: "Stock data retrieved successfully!",  stockShowdata });

    } catch (err) {
        console.error("🚨 StockShow Error:", err);
        res.status(500).json({ message: "StockShow Error", error: err.message });
    }
};

module.exports = stockShow;
