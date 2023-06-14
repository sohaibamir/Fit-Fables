import "./newOrEditDoctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createDoctor, getDoctorById, updateDoctor } from "../../../../api/api";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Carousel } from "react-bootstrap";
import { useToast } from "@chakra-ui/react";

const NewOrEditDoctor = ({ inputs, title }) => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    designation: "",
    timings: "",
    days: "",
    gender: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (title === "Edit Doctor Details") {
      getDoctorById(doctorId)
        .then((res) => {
          console.log("res", res);
          let doc = res?.data?.data;
          setDoctor({
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            address: doc.address,
            phone: doc.phone,
            designation: doc.designation,
            timings: doc.timings,
            days: doc.days,
            gender: doc.gender,
            price: doc.price,
          });
          let img = [];
          if (doc.img1) {
            img.push(doc.img1);
          }
          if (doc.img2) {
            img.push(doc.img2);
          }
          setImagePreview(img);
          setImages(img);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleDoctorChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    if (title === "Add New Doctor") {
      let newDoctor = {
        ...doctor,
        images,
      };
      createDoctor(newDoctor)
        .then((res) => {
          console.log("res", res);
          toast({
            title: "Doctor Added Successfully!",
            status: "success",
            duration: 3500,
            isClosable: true,
            position: "top",
          });
          navigate("/admin/doctors");
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Doctor Was Not Added Successfully!",
            status: "error",
            duration: 3500,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      updateDoctor(doctorId, doctor)
        .then((res) => {
          console.log(res);
          toast({
            title: "Doctor Updated Successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/admin/doctors");
        })
        .catch((err) => console.log(err));
    }
  };

  let remainingArr = [];
  if (title === "Add New Doctor") {
    const [id, ...restArr] = inputs;
    remainingArr = restArr;
  } else {
    let [id, name, email, ...restArr] = inputs;
    restArr = [id, name, email, ...restArr];
    remainingArr = restArr;
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title && title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div id="product_image">
              {imagePreview && imagePreview.length > 0 ? (
                <Carousel pause="hover">
                  {imagePreview.map((url) => {
                    return (
                      <Carousel.Item>
                        <img
                          style={{ objectFit: "contain" }}
                          className="d-block w-100"
                          alt="img"
                          src={url}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                <p>Please upload your image</p>
              )}
            </div>
          </div>
          <div className="right">
            <Row>
              <div className="formInput">
                <label style={{ cursor: "pointer" }} htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleOnChange}
                  style={{ display: "none" }}
                />
              </div>
              {remainingArr?.map((input) => (
                <Col
                  className="form-input"
                  key={input.id}
                  lg={6}
                  style={{ marginBlock: "12px" }}
                >
                  <label className="labelsOfDoctorInfo">{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      className="inputsOfDoctorInfo"
                      name={input.name}
                      value={doctor[input.name]}
                      onChange={handleDoctorChange}
                    >
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      disabled={
                        title === "Edit Doctor Details" &&
                        (input.name === "_id" ||
                          input.name === "name" ||
                          input.name === "email" ||
                          input.name === "password" ||
                          input.name === "phone" ||
                          input.name === "address")
                      }
                      className="inputsOfDoctorInfo"
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={doctor[input.name]}
                      onChange={handleDoctorChange}
                    />
                  )}
                </Col>
              ))}
              <Col lg={12}>
                <button style={{ width: "150px" }} onClick={handleSave}>
                  Save
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrEditDoctor;
