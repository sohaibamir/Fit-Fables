import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './remainingAppointments.scss';
import { Col, Row } from 'react-bootstrap';
import Datatable from '../../components/datatable/Datatable';

const RemainingAppointments = () => {
    return (
        <div className="CompletedAppointments">
            <Sidebar />
            <div className="CompletedAppointmentsContainer">
                <div className="top">
                    <h1>My Remaining Appointments</h1>
                </div>

                <div className="right">
                    {/* <Datatable /> */}
                </div>
            </div>
        </div>
    )
}

export default RemainingAppointments;