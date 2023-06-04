const Doctor = require('../models/doctor');

exports.createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create({
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            timings: req.body.timings,
            days: req.body.days,
            salary: req.body.salary
        });
        res.status(201).send({ data: doctor });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getAllDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find();
        res.status(201).send({ data: allDoctors });
    } catch (error) {
        res.status(500).send(error);
    }
}