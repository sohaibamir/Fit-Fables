import React, { useEffect, useState } from 'react';
import './doctors.scss';
import Datatable from '../../components/datatable/Datatable';
import Sidebar from '../../components/sidebar/Sidebar';
import { getAllDoctorsAdmin } from '../../../../api/api';

const Doctors = () => {
    const [doctors, setDoctors] = useState({
        tableHeader: [],
        tableBody: []
    });

    useEffect(() => {
        getAllDoctorsAdmin().then((res) => {
            console.log(res);
            let tableBody = res?.data?.data;
            const tableHeader = ["Name", "Designation", "Email Address", "Timings"];
            let reducedArr = [];
            tableBody?.forEach((obj) => {
                if (obj?.appointments?.length == 0 && obj?.completedAppointments?.length == 0) {
                    const { appointments, completedAppointments, ...remainingObj } = obj;
                    reducedArr.push(remainingObj);
                    tableBody = reducedArr;
                }
                else if (obj?.appointments?.length == 0) {
                    const { appointments, ...remainingObj } = obj;
                    reducedArr.push(remainingObj);
                    tableBody = reducedArr;
                }
                else if (obj?.completedAppointments?.length == 0) {
                    const { completedAppointments, ...remainingObj } = obj;
                    reducedArr.push(remainingObj);
                    tableBody = reducedArr;
                }
                else {
                    console.log("original array not modified");
                }
            });

            setDoctors({ tableHeader, tableBody });
        }).catch((error) => console.log(error));
    }, []);

    return (
        <div className="doctors">
            <Sidebar />
            <div className="doctorsContainer">
                <Datatable tableTitle="Doctors" tableData={doctors} />
            </div>
        </div>
    )
}

export default Doctors;