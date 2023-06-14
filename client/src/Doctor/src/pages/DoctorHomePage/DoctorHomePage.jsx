import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./doctorHomePage.scss";
import { Col, Row } from "react-bootstrap";
import { getDoctorById, isAuthenticated } from "../../../../api/api";

const DoctorHomePage = ({ inputs }) => {
  const doctorId = isAuthenticated()._id;
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    getDoctorById(doctorId)
      .then((res) => {
        console.log("res", res);
        setDoctor(res?.data?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="doctor-profile">
      <Sidebar />
      <div className="doctorProfileContainer">
        <div className="top">
          <h1>My Profile</h1>
        </div>

        <div className="right">
          <Row>
            <Col lg={12}>
              <div className="doctor-avatar-container">
                <img
                  alt={doctor.gender === "female" ? "woman" : "man"}
                  src={doctor.img1}
                />
                <h3>{doctor.name}</h3>
              </div>
            </Col>
            {inputs?.map((input) => (
              <Col
                key={input.id}
                lg={6}
                style={{
                  marginBlock: "12px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label className="labelsOfDoctorProfileInfo">
                  {input.label}
                </label>
                <input
                  disabled={
                    input.name === "name" ||
                    input.name === "email" ||
                    input.name === "phone" ||
                    input.name === "designation" ||
                    input.name === "timings" ||
                    input.name === "days"
                  }
                  className="inputsOfDoctorProfileInfo"
                  name={input.name}
                  type={input.type}
                  value={doctor[input.name]}
                />
              </Col>
            ))}
            <Col lg={12}>
              <button style={{ width: "150px" }}>Save</button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DoctorHomePage;
