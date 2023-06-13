import "./newOrEditDoctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createDoctor, getDoctorById } from "../../../../api/api";
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
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (title == "Edit Doctor Details") {
      getDoctorById(doctorId)
        .then((res) => {
          console.log("res", res);
          setDoctor(res?.data?.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleDoctorChange = (e) => {
    if (title === "Add New Doctor") {
      setDoctor({ ...doctor, [e.target.name]: e.target.value });
    }
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
    }
  };

  let remainingArr = [];
  if (title === "Add New Doctor") {
    const [id, ...restArr] = inputs;
    remainingArr = restArr;
  } else {
    let [id, name, email, password, ...restArr] = inputs;
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
                <p>Please upload product images</p>
              )}
            </div>
          </div>
          <div className="right">
            <Row>
              <div className="formInput">
                <label htmlFor="file">
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
                      disabled={
                        title === "Edit Doctor Details" &&
                        (input.name === "_id" ||
                          input.name === "name" ||
                          input.name === "email")
                      }
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
                          input.name === "email")
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
