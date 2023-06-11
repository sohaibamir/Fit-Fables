import "./newOrEditDoctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { getDoctorById } from "../../../../api/api";


const NewOrEditDoctor = ({ inputs, title }) => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    if (title == "Edit Doctor Details") {
      getDoctorById(doctorId).then((res) => {
        console.log('res', res);
        setDoctor(res?.data?.data);
      })
        .catch((error) => console.log(error));
    }
  }, []);

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
              {inputs.map((input) => (
                <Col key={input.id} lg={6} style={{ marginBlock: "12px" }}>
                  <label className="labelsOfDoctorInfo">{input.label}</label>
                  <input
                    disabled={title == "Edit Doctor Details" && doctor[input.name] == "_id"}
                    className="inputsOfDoctorInfo"
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
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
    </div>
  );
};

export default NewOrEditDoctor;
