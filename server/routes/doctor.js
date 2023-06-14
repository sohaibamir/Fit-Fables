const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctor");
const { authMiddleware } = require("../middlewares/auth");

router.post("/admin/doctor/create", createDoctor);
router.get("/doctors/all", authMiddleware, getAllDoctors);
router.get("/admin/doctors/:doctorId", getDoctorById);
router.put("/update/doctor/:doctorId", updateDoctor);
router.delete("/admin/delete/doctor/:doctorId", deleteDoctor);

module.exports = router;
