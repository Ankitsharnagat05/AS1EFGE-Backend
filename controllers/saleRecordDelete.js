const express = require("express");
const sales = require("../models/sales");

// ✅ 1. Single Sale Entry Delete with User Authorization
const deleteOnesaleRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await sales.findById(id);

        // ✅ Ensure only the logged-in user can delete their own sale entry
        if (!sale || sale.userId.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized! You can't delete this sale entry." });
        }

        await sales.findByIdAndDelete(id);
        res.status(200).json({ message: "Sale entry deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Sale delete rejected", error: err.message });
    }
};

// ✅ 2. Delete All Sale Entries of Logged-in User
const deleteAllUserSales = async (req, res) => {
    try {
        // ✅ Ensure user can delete only their own sales, not the entire database
        const result=await sales.deleteMany({ userId: req.user.userId });
        console.log("result",result)
        return res.status(200).json({ message: "All your sales entries deleted successfully!" });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Error deleting your sales entries", error: err.message });

    }
};

module.exports = { deleteOnesaleRecord, deleteAllUserSales };
