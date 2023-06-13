import { Box } from "@chakra-ui/react";
import Tabs from "../components/navbar/Tabs";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import img1 from './images/team-image1.jpg'
import img2 from './images/team-image2.jpg'
import img3 from './images/team-image3.jpg'
import './consultation.css'
import { useEffect, useState } from "react";
import { getAllDoctorsAdmin } from "../api/api";

const Consultation = () => {

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getAllDoctorsAdmin().then((res) => {
      setDoctors(res.data.data)
    })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Tabs />
      <Box
        w={{ base: "90%", sm: "90%", lg: "90%", xl: "80%" }}
        margin="80px auto"
        color={"rgba(0,0,0,0.7)"}
      >
        <HealthCareBreadcrumb title="Consultation" />
        <section id="team" data-stellar-background-ratio="1">
          <div className="container">
            <div className="row">

              {/* <div className="col-md-6 col-sm-6">
                <div className="about-info">
                  <h2 className="wow fadeInUp" data-wow-delay="0.1s">Our Doctors</h2>
                </div>
              </div> */}

              {
                doctors.map((doctor,index) => (
                  <div className="col-md-3 col-sm-4 mt-5" key={index}>
                    <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                      <img src={img3} className="img-responsive" alt="" />

                      <div className="team-info">
                        <h3>{doctor.doctorName}</h3>
                        <p>{doctor.designation}</p>
                        <div className="team-contact-info">
                          <p><i className="fa fa-phone"></i>{doctor.days}</p>
                          <p><i className="fa fa-phone"></i>{doctor.timings}</p>
                          <p className="mt-3" ><i className="fa fa-envelope-o"></i> <a href="#">{doctor.email}</a></p>
                        </div>
                        <p style={{ marginTop: '15px', color: 'rgba(66, 153, 225, 0.6)', marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold' }}>Book Appointment</p>
                      </div>
                    </div>
                  </div>
                ))
              }

              {/* 
              <div className="col-md-4 col-sm-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.4s">
                  <img src={img2} className="img-responsive" alt=""/>

                    <div className="team-info">
                      <h3>Jason Stewart</h3>
                      <p>Pregnancy</p>
                      <div className="team-contact-info">
                        <p><i className="fa fa-phone"></i> 010-070-0170</p>
                        <p><i className="fa fa-envelope-o"></i> <a href="#">pregnancy@company.com</a></p>
                      </div>
                    </div>

                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.6s">
                  <img src={img3} className="img-responsive" alt=""/>

                    <div className="team-info">
                      <h3>Miasha Nakahara</h3>
                      <p>Cardiology</p>
                      <div className="team-contact-info">
                        <p><i className="fa fa-phone"></i> 010-040-0140</p>
                        <p><i className="fa fa-envelope-o"></i> <a href="#">cardio@company.com</a></p>
                      </div>
                    </div>

                </div>
              </div> */}

            </div>
          </div>
        </section>
      </Box>
    </>
  );
};

export default Consultation;
