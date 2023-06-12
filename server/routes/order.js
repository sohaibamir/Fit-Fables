const express = require("express");
const router = express.Router();

const { createOrders, getOrders, getAllOrders, getOrderById, updateOrderById, getAllCustomerOrders, getSixMonthsRevenue, getProductsOfSingleOrder } = require("../controllers/order");
const { getUserById } = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

router.post("/orders/create/:userId", isAuth, createOrders);
router.get("/orders/:userId", getOrders);
router.get("/admin/getAllOrders", getAllOrders);
router.get("/admin/orders/:orderId", getOrderById);
router.patch("/admin/update-order/:orderId", updateOrderById);
router.get("/admin/getcustomerOrders/:customerID", getAllCustomerOrders);
router.get("/admin/getDashboardData", getSixMonthsRevenue);
router.get("/admin/orders/getProducts/:orderId", getProductsOfSingleOrder);

router.param("userId", getUserById);

module.exports = router;
