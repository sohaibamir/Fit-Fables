const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const { ObjectId } = mongoose.Schema;

const doctorSchema = new Schema(
  {
    img1: { type: String },
    img2: { type: String },
    designation: {
      type: String,
      required: true,
    },
    timings: {
      type: String,
      required: true,
      default: "1:00 P.M. - 5:00 P.M.",
    },
    days: {
      type: String,
      required: true,
      default: "Monday - Friday",
    },
    appointments: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
        },
      },
    ],
    completedAppointments: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);

const Doctor = User.discriminator("Doctor", doctorSchema);

module.exports = Doctor;
