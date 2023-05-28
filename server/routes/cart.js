const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} = require("../controllers/cart");

const { authMiddleware } = require("../middlewares/auth");

router.get("/cart", authMiddleware, getCartItems);
router.post("/cart", authMiddleware, addItemToCart);
router.patch("/cart/:id", authMiddleware, updateCartItem);
router.delete("/cart/:id", authMiddleware, removeItemFromCart);

module.exports = router;
