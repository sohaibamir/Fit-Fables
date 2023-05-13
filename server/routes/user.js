const express = require("express");
const router = express.Router();

const { signup, login, checkLoggedIn } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

router.get("/checkLoggedIn", authMiddleware, checkLoggedIn);
router.post("/login", authMiddleware, login);
router.post("/signup", authMiddleware, signup);

module.exports = router;
