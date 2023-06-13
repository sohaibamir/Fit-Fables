import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './doctorHomePage.scss';
import { Col, Row } from 'react-bootstrap';
import manAvatar from '../../../avatars/man.png';

const DoctorHomePage = ({ inputs }) => {
    return (
        <div className="doctor-profile">
            <Sidebar />
            <div className="doctorProfileContainer">
                <div className="top">
                    <h1>My Profile</h1>
                </div>

                <div className="right">
                    <Row>
                        {/* {remainingArr?.map((input) => ( */}
                        <Col lg={12}>
                            <div className='doctor-avatar-container'>
                                <img src={manAvatar} />
                                <h3>Asad</h3>
                            </div>
                        </Col>
                        {inputs?.map((input) => (
                            <Col
                                key={input.id}
                                lg={6}
                                style={{ marginBlock: "12px", display: "flex", flexDirection: "column" }}
                            >
                                <label className="labelsOfDoctorProfileInfo">{input.label}</label>
                                <input
                                    disabled={input.name === "designation" || input.name === "timings" || input.name === "days"}
                                    className="inputsOfDoctorProfileInfo"
                                    name={input.name}
                                    type={input.type}
                                // value={doctor[input.name]}
                                />
                            </Col>
                        ))}
                        <Col lg={12}>
                            <button style={{ width: "150px" }}>
                                Save
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default DoctorHomePage;