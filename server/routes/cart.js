const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} = require("../controllers/cart");

const { authMiddleware } = require("../middlewares/auth");

router.get("/", authMiddleware, getCartItems);
router.post("/", authMiddleware, addItemToCart);
router.patch("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, removeItemFromCart);

module.exports = router;
