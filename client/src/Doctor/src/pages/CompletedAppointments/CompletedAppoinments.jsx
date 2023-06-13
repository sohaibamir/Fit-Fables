import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './completedAppointments.scss';
import { Col, Row } from 'react-bootstrap';
import Datatable from '../../components/datatable/Datatable';

const CompletedAppointments = () => {
    return (
        <div className="CompletedAppointments">
            <Sidebar />
            <div className="CompletedAppointmentsContainer">
                <div className="top">
                    <h1>My Completed Appointments</h1>
                </div>

                <div className="right">
                    {/* <Datatable /> */}
                </div>
            </div>
        </div>
    )
}

export default CompletedAppointments;