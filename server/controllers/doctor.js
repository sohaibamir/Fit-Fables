const Doctor = require("../models/doctor");
const cloudinary = require("cloudinary");
const user = require("../models/user");

exports.createDoctor = async (req, res) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      let result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        transformation: [{ width: 250, height: 250, crop: "fill" }],
      });

      imagesLink.push(result.secure_url);
    }

    imagesLink = imagesLink.slice(0, 2);

    let img1 = "";
    let img2 = "";

    for (let i = 0; i < imagesLink.length; i++) {
      if (i == 0) {
        img1 = imagesLink[i];
      } else if (i == 1) {
        img2 = imagesLink[i];
      }
    }
    const {
      name,
      email,
      password,
      address,
      phone,
      designation,
      timings,
      days,
      gender,
      price,
    } = req.body;

    const doctor = await Doctor.create({
      name,
      email,
      password,
      phone,
      address,
      gender,
      designation,
      timings,
      days,
      price,
      img1,
      img2,
      role: "doctor",
    });
    const savedDoctor = await doctor.save();
    console.log(savedDoctor);
    res.status(201).send({ data: savedDoctor });
  } catch (error) {
    console.log(error);

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

exports.updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: doctorId },
      { ...req.body.doctor },
      { new: true }
    );
    return res.status(201).send({ message: "success", data: doctor });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, userId } = req.params;
    let appoint = {};
    const patient = await user.findOne({ _id: userId });
    const { _id, name, email, password, phone, address, authType, createdAt, updatedAt, __v, role, gender } = patient;
    appoint = { name, email, phone, address, gender, status: "remaining", ...appoint };
    const doctor = await Doctor.findByIdAndUpdate({ _id: doctorId }, { $set: { appointments: appoint } }, { new: true });

    res.status(201).send({ status: "success", data: doctor });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRemainingAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findOne({ _id: doctorId });

    if (doctor) {
      res.status(201).send({ data: doctor?.appointments });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCompletedAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findOne({ _id: doctorId });

    if (doctor) {
      res.status(201).send({ data: doctor?.completedAppointments });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};