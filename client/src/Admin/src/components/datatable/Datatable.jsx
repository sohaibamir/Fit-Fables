import "./datatable.scss";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Datatable = ({ tableTitle, tableData }) => {
  const [data, setData] = useState(userRows);
  const [page, setPage] = useState(1);
  const [renderData, setRenderData] = useState(data.slice(0, 10));

  const onChangePage = (page) => {
    const offset = (page - 1) * 10;
    let changePage = data.slice(offset, offset + 10);
    setPage(page);
    setRenderData(changePage);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {tableTitle}
        {tableTitle == "Products" ? (
          <Link to="/admin/new/product" className="link">
            Add New
          </Link>
        ) : tableTitle == "Doctors" ? (
          <Link to="/admin/new/doctor" className="link">
            Add New
          </Link>
        ) : null}
      </div>

      <Table striped>
        <thead>
          {tableData?.tableHeader?.length > 0 && (
            <tr>
              {tableData?.tableHeader?.map((value) => {
                return <th>{value}</th>;
              })}
            </tr>
          )}
        </thead>

        {tableData?.tableBody?.length > 0 && (
          <tbody>
            {tableData?.tableBody?.map((eachRecord) => {
              return (
                <tr>
                  {Object.values(eachRecord)?.map((value) => {
                    return <td>{value}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
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
