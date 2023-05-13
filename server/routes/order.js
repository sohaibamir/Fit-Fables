const express = require("express");
const router = express.Router();

const { createOrders, getOrders } = require("../controllers/order");
const { authMiddleware } = require("../middlewares/auth");

router.get("/create", authMiddleware, createOrders);
router.get("/", authMiddleware, getOrders);

module.exports = router;
