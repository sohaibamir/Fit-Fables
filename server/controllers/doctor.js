const Doctor = require('../models/doctor');
const bycrypt = require('bcryptjs');

exports.createDoctor = async (req, res) => {
    try {
        const { doctorName, email, password, designation, timings, days } = req.body;
        const encryptedPass = await bycrypt.hash(password, 10);
        const doctor = await Doctor.create({
            doctorName,
            email,
            password: encryptedPass,
            designation,
            timings,
            days
        });

        res.status(201).send({ data: doctor });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find();
        res.status(201).send({ data: allDoctors });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findOne({ _id: doctorId });
        res.status(201).send({ data: doctor });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
        res.status(201).send({ data: doctor });
    } catch (error) {
        res.status(500).send(error);
    }
};
