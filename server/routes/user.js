const express = require("express");
const router = express.Router();

const { signup, login, checkLoggedIn, getAllUsers, getUserByIdAdmin, updateAppointmentHistory } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

router.get("/checkLoggedIn", authMiddleware, checkLoggedIn);
router.post("/login", authMiddleware, login);
router.post("/signup", authMiddleware, signup);
router.get("/admin/getUsers", getAllUsers);
router.get("/admin/getuser/:id", getUserByIdAdmin);
router.patch('/updateAppointmenthistory/:userId/:doctorId', updateAppointmentHistory);

module.exports = router;
