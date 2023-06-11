const express = require('express');
const router = express.Router();

const { createDoctor, getAllDoctors, getDoctorById } = require('../controllers/doctor');
const { authMiddleware } = require('../middlewares/auth');

router.post('/doctor/create', authMiddleware, createDoctor);
router.get('/doctors/all', authMiddleware, getAllDoctors);
router.get('/admin/doctors/:doctorId', getDoctorById);

module.exports = router;