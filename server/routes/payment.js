const express = require("express");
const router = express.Router();

const { orderPayment } = require("../controllers/payment");

router.post("/payment", orderPayment);

module.exports = router;
