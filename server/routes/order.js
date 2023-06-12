const express = require("express");
const router = express.Router();

const { createOrders, getOrders, getAllOrders, getOrderById, updateOrderById, getAllCustomerOrders, getSixMonthsRevenue, getProductsOfSingleOrder } = require("../controllers/order");
const { authMiddleware } = require("../middlewares/auth");

router.get("/create", authMiddleware, createOrders);
router.get("/orders", authMiddleware, getOrders);
router.get("/admin/getAllOrders", getAllOrders);
router.get('/admin/orders/:orderId', getOrderById);
router.patch('/admin/update-order/:orderId', updateOrderById);
router.get("/admin/getcustomerOrders/:customerID", getAllCustomerOrders);
router.get("/admin/getDashboardData", getSixMonthsRevenue);
router.get("/admin/orders/getProducts/:orderId", getProductsOfSingleOrder);

module.exports = router;
