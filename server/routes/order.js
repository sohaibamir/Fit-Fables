const express = require("express");
const router = express.Router();

const { createOrders, getOrders,getAllOrders } = require("../controllers/order");
const { authMiddleware } = require("../middlewares/auth");

router.get("/create", authMiddleware, createOrders);
router.get("/", authMiddleware, getOrders);
router.get("/admin/getorders", getAllOrders);

module.exports = router;
