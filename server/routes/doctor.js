const express = require('express');
const router = express.Router();

const { createDoctor, getAllDoctors } = require('../controllers/doctor');
const { authMiddleware } = require('../middlewares/auth');

router.post('/doctor/create', authMiddleware, createDoctor);
router.get('/doctors/all', authMiddleware, getAllDoctors);

module.exports = router;