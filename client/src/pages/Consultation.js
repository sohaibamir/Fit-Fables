import { Box } from "@chakra-ui/react";
import Tabs from "../components/navbar/Tabs";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import img1 from './images/team-image1.jpg'
import img2 from './images/team-image2.jpg'
import img3 from './images/team-image3.jpg'
import './consultation.css'
import { useEffect, useState } from "react";
import { getAllDoctorsAdmin } from "../api/api";
import { AiFillClockCircle, AiOutlineCalendar, AiOutlineMail, AiFillDollarCircle, AiOutlineArrowRight } from "react-icons/ai";

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
        <section id="team" style={{ marginTop: "-60px" }} data-stellar-background-ratio="1">
          <div className="col-md-6 col-sm-6" style={{ marginLeft: "15px" }}>
            <div className="about-info">
              <h2 className="fadeInUp" style={{color:'grey'}} data-wow-delay="0.1s">Consult Our Doctors</h2>
            </div>
          </div>
          <div className="container">
            <div className="row">


              {
                doctors.map((doctor, index) => (
                  <div className="col-md-3 col-sm-4 mt-5" key={index}>
                    <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                      <img src={img3} style={{ width: '100%', height: '250px', objectFit: 'cover' }} className="img-responsive" alt="" />

                      <div className="team-info">
                        <h3 style={{color:'grey'}} >{doctor.name.slice(0,10)}</h3>
                        <p style={{fontWeight:'bold',color:'grey'}}>{doctor.designation}</p>
                        <div className="team-contact-info">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AiFillDollarCircle style={{ color: 'rgba(66, 153, 225, 0.6)', fontSize: "16px", marginRight: '4px' }} />
                            <p >Rs-300</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AiOutlineCalendar style={{ color: 'rgba(66, 153, 225, 0.6)', fontSize: "16px", marginRight: '4px' }} />
                            <p>{doctor.days}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AiFillClockCircle style={{ color: 'rgba(66, 153, 225, 0.6)', fontSize: "16px", marginRight: '4px' }} />
                            <p>{doctor.timings}</p>
                          </div>
                          <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <AiOutlineMail style={{ color: 'rgba(66, 153, 225, 0.6)', fontSize: "16px", marginRight: '4px' }} />
                            <p><a href="#">{doctor.email}</a></p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center',cursor:'pointer' }}>
                          <p style={{ marginTop: '15px', color: 'rgba(66, 153, 225, 0.6)', marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold'}}>Book Appointment</p>
                          <AiOutlineArrowRight style={{ color: 'rgba(66, 153, 225, 0.6)', fontSize: "16px"}} />
                        </div>
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
