import "./newOrEditDoctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { createDoctor, getDoctorById } from "../../../../api/api";
import { useToast } from "@chakra-ui/react";


const NewOrEditDoctor = ({ inputs, title }) => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (title == "Edit Doctor Details") {
      getDoctorById(doctorId).then((res) => {
        console.log('res', res);
        setDoctor(res?.data?.data);
      })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleDoctorChange = (e) => {
    if (title === "Add New Doctor") {
      setDoctor({ ...doctor, [e.target.name]: e.target.value });
    }
  }

  const handleSave = () => {
    if (title === "Add New Doctor") {
      createDoctor(doctor).then((res) => {
        console.log('res', res);
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
  }
  else {
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
          <div className="right">
            <Row>
              {remainingArr?.map((input) => (
                <Col key={input.id} lg={6} style={{ marginBlock: "12px" }}>
                  <label className="labelsOfDoctorInfo">{input.label}</label>
                  <input
                    disabled={(title === "Edit Doctor Details") && (input.name === "_id" || input.name === "doctorName" || input.name === "email")}
                    className="inputsOfDoctorInfo"
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={doctor[input.name]}
                    onChange={handleDoctorChange}
                  />
                </Col>
              ))}
              <Col lg={12}>
                <button style={{ width: "150px" }} onClick={handleSave}>Save</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrEditDoctor;
