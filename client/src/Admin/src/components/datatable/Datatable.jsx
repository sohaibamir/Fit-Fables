import "./datatable.scss";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Datatable = ({ tableTitle, ordersData }) => {
  const [data, setData] = useState(userRows);
  const [page, setPage] = useState(1)
  const [renderData, setRenderData] = useState(data.slice(0, 10))

  const onChangePage = (page) => {
    const offset = ((page - 1) * 10);
    let changePage = data.slice(offset, offset + 10);
    setPage(page)
    setRenderData(changePage);
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {tableTitle}
        <Link to="/admin/new/user" className="link">
          Add New
        </Link>

        {/* {
          callFrom == 'Products' &&
          <Link to="/admin/new/product" className="link">
            Add New
          </Link>
        } */}
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

        {/* <tbody>
          {
            renderData.map((ele, ind) => {
              return (
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.pass}</td>
                  <td>Karachi</td>
                  <td>{ele.email}</td>
                </tr>
              )
            })

          }
        </tbody> */}
      </Table>

      <div className="pagination-div">
        <PaginationControl
          page={page}
          next={true}
          last={true}
          total={data.length}
          limit={10}
          changePage={(page) => onChangePage(page)}
          ellipsis={1}
        />
      </div>
    </div>
  );
};

export default Datatable;
