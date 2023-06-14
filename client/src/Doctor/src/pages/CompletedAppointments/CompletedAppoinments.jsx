import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './completedAppointments.scss';
import Datatable from '../../components/datatable/Datatable';
import { getCompletedAppointments } from '../../../../api/api';

const CompletedAppointments = () => {
    const [compAppointments, setCompAppointments] = useState({
        tableHeader: [],
        tableBody: [],
    });

    const doctor = JSON.parse(localStorage.getItem("jwt"));
    const doctorId = doctor?._id;

    useEffect(() => {
        getCompletedAppointments(doctorId).then((res) => {
            console.log('completed appointment', res);
            let tableBody = [];
            let tableHeader = ["Name", "Email", "Phone", "Address", "Gender", "Status"];
            tableBody = res?.data?.data;
            setCompAppointments({ tableHeader, tableBody });
        }).catch((error) => console.log(error));
    }, []);

    return (
        <div className="CompletedAppointments">
            <Sidebar />
            <div className="CompletedAppointmentsContainer">
                <div className="top">
                    <h1>My Completed Appointments</h1>
                </div>

                <div className="right">
                    <Datatable tableData={compAppointments} />
                </div>
            </div>
        </div>
    )
}

export default CompletedAppointments;