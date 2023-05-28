import "./datatable.scss";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import Table from 'react-bootstrap/Table';


const Datatable = ({ tableTitle, ordersData }) => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {tableTitle}
        <Link to="/admin/new/user" className="link">
          Add New
        </Link>
      </div>

      <Table striped>
        <thead>
          {ordersData?.tableHeader?.length > 0 &&
            <tr>
              {
                ordersData?.tableHeader?.map((value) => {
                  return (
                    <th>{value}</th>
                  )
                })
              }
            </tr>}
        </thead>

        {ordersData?.tableBody?.length > 0 &&
          <tbody>
            {ordersData?.tableBody?.map((record) => {
              return (
                <tr>
                  <td>{record?.orderId}</td>
                  <td>{record?.customerId}</td>
                  <td>{record?.deliveryAddress}</td>
                  <td>{record?.orderPlaceTime}</td>
                  <td>{record?.orderStatus}</td>
                </tr>
              )
            })}
          </tbody>
        }
      </Table>
    </div>
  );
};

export default Datatable;
