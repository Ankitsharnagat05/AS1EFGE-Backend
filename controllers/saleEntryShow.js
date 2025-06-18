const express = require("express");
const Sales = require("../models/sales");

const SaleShow = async (req, res) => {
    try {
        // ✅ Fix: Filter Sales Data for Logged-in User
        const userId = req.user.userId;  // Token se user ID nikalna
        const SaleShowdata = await Sales.find({ userId });

        return res.status(200).json({
            message: "Sale data received successfully",
            data: SaleShowdata
        });

    } catch (err) {
        console.error("SaleShow Error:", err);
        res.status(500).json({ message: "Server Error! Unable to fetch sales data.", error: err });
    }
};

module.exports = SaleShow;
