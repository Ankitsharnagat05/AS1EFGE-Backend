const Stock = require("../models/stock");

const autoFetchProductData = async (req, res, next) => {
  try {
    // 🔍 Validate that productsSold is an array
    if (!Array.isArray(req.body.productsSold) || req.body.productsSold.length === 0) {
      console.log("🚨 productsSold is missing or invalid:", req.body.productsSold);
      return res.status(400).json({ message: "At least one product must be provided in an array!" });
    }

    const userId = req.user.userId; // 🛡️ Extract user ID from token

    for (const product of req.body.productsSold) {
      if (!product.productId) {
        // 🛡️ Secure: Only fetch stock from the current user's stock entries
        const stockItem = await Stock.findOne({
          productName: product.productName,
          user: userId
        });

        if (!stockItem) {
          return res.status(404).json({
            message: `❌ Product '${product.productName}' not found in your stock!`
          });
        }

        // ✅ Assign correct product ID and selling price from matched stock
        product.productId = stockItem._id;
        product.sellingPricePerUnit = stockItem.sellingPricePerUnit;
      }
    }

    next(); // 🟢 Proceed to the next middleware/controller

  } catch (err) {
    console.error("❌ Error in autoFetchProductData:", err);
    res.status(500).json({ message: "Server error in auto-fetch middleware", error: err.message });
  }
};

module.exports = autoFetchProductData;
