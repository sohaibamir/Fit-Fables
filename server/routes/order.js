const express = require("express");
const router = express.Router();

const { createOrders, getOrders,getAllOrders,getAllCustomerOrders,getSixMonthsRevenue } = require("../controllers/order");
const { authMiddleware } = require("../middlewares/auth");

router.get("/create", authMiddleware, createOrders);
router.get("/", authMiddleware, getOrders);
router.get("/admin/getorders", getAllOrders);
router.get("/admin/getcustomerOrders/:customerID", getAllCustomerOrders);
router.get("/admin/getDashboardData", getSixMonthsRevenue);

module.exports = router;
