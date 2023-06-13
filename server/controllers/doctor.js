const Doctor = require("../models/doctor");
const cloudinary = require("cloudinary");

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

exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
    res.status(201).send({ data: doctor });
  } catch (error) {
    res.status(500).send(error);
  }
};
