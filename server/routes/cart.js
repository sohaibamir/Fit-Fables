const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} = require("../controllers/cart");

const { isAuth } = require("../middlewares/auth");
const { getUserById } = require("../controllers/user");

router.get("/cart/:userId", isAuth, getCartItems);
router.post("/cart/:userId", isAuth, addItemToCart);
router.patch("/cart/:id/:userId", isAuth, updateCartItem);
router.delete("/cart/:id/:userId", isAuth, removeItemFromCart);

router.param("userId", getUserById);

module.exports = router;
