const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
    doctorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    timings: {
        type: String,
        required: true,
        default: "1:00 P.M. - 5:00 P.M."
    },
    days: {
        type: String,
        required: true,
        default: "Monday - Friday"
    },
    appointments: {
        type: Array,
        default: []
    },
    completedAppointments: {
        type: Array,
        default: []
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;