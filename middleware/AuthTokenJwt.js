const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // ✅ Extract token properly
    // console.log("backToken",token)

    if (!token) {
        return res.status(400).json({ message: "Authentication token is not valid" });
    }

    // console.log("this token secret key ",process.env.JWT_SECRET)

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // ✅ Hardcoded secret key
        // console.log("decode",decode)
        req.user = decode;
        next();
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Invalid token!" });
    }
};

module.exports = verifyToken;
