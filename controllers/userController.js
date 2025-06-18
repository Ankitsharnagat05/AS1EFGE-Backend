const express = require("express");
const mongoose = require("mongoose");
const registration = require("../models/register");
const bcrypt = require("bcrypt");

// Registration function
const Authregistration = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, userName, passWord } = req.body;

        if (!fullname || !email || !phoneNumber || !userName || !passWord) {
            return res.status(400).json({ message: "Check your information, some fields are not valid" });
        }

        
        const registerData = new registration({ fullname, email, phoneNumber, userName, passWord});

        await registerData.save();

        return res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        res.status(500).json({ message: "Authregistration failed, check the error", err });
    }
}

// Login function
const AuthLogin = async (req, res) => {
    try {
        const { userName, passWord } = req.body;

        const user = await registration.findOne({ userName });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ✅ Check hashed password in database
        const isMatch = await bcrypt.compare(passWord, user.passWord);

    

        if (isMatch) {
            const Token = await user.authTokenGenerate();
            await user.save();  // ✅ Fix: Save only after token generation
            return res.status(200).json({ message: "Login successful", Token });
        } else {
            return res.status(400).json({ message: "Login rejected" });
        }

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error!", error: err });
    }
};


module.exports = { Authregistration, AuthLogin };
