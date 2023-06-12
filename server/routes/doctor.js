const express = require('express');
const router = express.Router();

const { createDoctor, getAllDoctors, getDoctorById } = require('../controllers/doctor');
const { authMiddleware } = require('../middlewares/auth');

router.post('/admin/doctor/create', createDoctor);
router.get('/doctors/all', authMiddleware, getAllDoctors);
router.get('/admin/doctors/:doctorId', getDoctorById);

module.exports = router;