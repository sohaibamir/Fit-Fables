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
            const tableBody = res?.data?.data;
            const tableHeader = ["ID", "Name", "Designation", "Email Address", "Timings", "Days", "Salary"];
            tableBody?.forEach(() => {
                setDoctors({
                    tableHeader, tableBody
                })
            })
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