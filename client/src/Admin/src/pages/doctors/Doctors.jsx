import React from 'react';
import './doctors.scss';
import Datatable from '../../components/datatable/Datatable';
import Sidebar from '../../components/sidebar/Sidebar';

const Doctors = () => {
    const doctorsData = {
        tableHeader: ["Doctor ID", "Doctor Name", "Designation", "Email Address", "Timings", "Days", "Salary"],
        tableBody: [
            { doctorId: "1", doctorName: "Haseeb", designation: "Dentist", email: "ha123@gmail.com", timings: "1:00 P.M. - 5:00 P.M.", days: "Monday - Friday", salary: "150,000 PKR" },
            { doctorId: "2", doctorName: "Sohaib", designation: "Surgeon", email: "ha123@gmail.com", timings: "1:00 P.M. - 5:00 P.M.", days: "Monday - Friday", salary: "150,000 PKR" },
            { doctorId: "3", doctorName: "Moazzam", designation: "Heart Specialist", email: "ha123@gmail.com", timings: "1:00 P.M. - 5:00 P.M.", days: "Monday - Friday", salary: "150,000 PKR" },
        ],
    };

    return (
        <div className="doctors">
            <Sidebar />
            <div className="doctorsContainer">
                <Datatable tableTitle="Doctors" tableData={doctorsData} />
            </div>
        </div>
    )
}

export default Doctors;