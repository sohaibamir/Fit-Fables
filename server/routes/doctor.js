const express = require('express');
const router = express.Router();

const { createDoctor, getAllDoctors, getDoctorById, deleteDoctor, bookAppointment, getRemainingAppointments, getCompletedAppointments } = require('../controllers/doctor');
const { authMiddleware } = require('../middlewares/auth');

router.post('/admin/doctor/create', createDoctor);
router.get('/doctors/all', authMiddleware, getAllDoctors);
router.get('/admin/doctors/:doctorId', getDoctorById);
router.delete('/admin/delete/doctor/:doctorId', deleteDoctor);
router.patch('/doctor/bookAppointment/:doctorId/:userId', bookAppointment);
router.get('/doctor/getRemainingAppointments/:doctorId', getRemainingAppointments);
router.get('/doctor/getCompletedAppointments/:doctorId', getCompletedAppointments);

module.exports = router;