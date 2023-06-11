import "./datatable.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Datatable = ({ tableTitle, tableData }) => {
  const [data, setData] = useState(tableData.tableBody);
  const [page, setPage] = useState(1);

  useEffect(() => {
    onChangePage(page);
  }, [tableData]);

  const onChangePage = (page) => {
    const offset = (page - 1) * 10;
    let changePage = tableData.tableBody.slice(offset, offset + 10);
    setPage(page);
    setData(changePage);
  };

  return (
    <div className="datatable">
      {tableTitle !== "Last Transactions" && (
        <div className="datatableTitle">
          {tableTitle}
          {tableTitle === "Products" ? (
            <Link to="/admin/new/product" className="link">
              Add New
            </Link>
          ) : tableTitle === "Doctors" ? (
            <Link to="/admin/new/doctor" className="link">
              Add New
            </Link>
          ) : null}
        </div>
      )}

      <Table striped style={{ margin: "0px", padding: "0px" }}>
        <thead>
          {tableData?.tableHeader?.length > 0 && (
            <tr style={{ textAlign: "center" }}>
              {tableTitle === "Products" && <th></th>}
              {tableData?.tableHeader?.map((value) => {
                if (value !== "_id" && value !== "img1") {
                  return (
                    <td
                      key={value}
                      style={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      {value.toUpperCase()}
                    </td>
                  );
                }
              })}
              <th></th>
            </tr>
          )}
        </thead>

        {data?.length > 0 && (
          <tbody>
            {data.map(({ _id, img1, ...eachRecord }) => {
              return (
                <tr
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    paddingTop: "auto",
                    paddingBottom: "auto",
                  }}
                >
                  {tableTitle === "Products" && (
                    <td>
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        src={img1 ? img1 : null}
                        alt="products"
                      />
                    </td>
                  )}
                  {tableTitle === "Doctors" && <td>{_id}</td>}
                  {Object.values(eachRecord)?.map((value) => {
                    return <td key={value}>{value}</td>;
                  })}
                  {tableTitle === "Products" ? (
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to={`/admin/product/${_id}`}
                          style={{ marginRight: "7px", cursor: "pointer" }}
                        >
                          <EditIcon color="green.500" />
                        </Link>
                        <div style={{ cursor: "pointer" }}>
                          <DeleteIcon color="red.500" />
                        </div>
                      </div>
                    </td>
                  ) : tableTitle === "Doctors" ? (
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to={`/admin/doctor/${_id}`}
                          style={{ marginRight: "7px", cursor: "pointer" }}
                        >
                          <EditIcon color="green.500" />
                        </Link>
                        <div style={{ cursor: "pointer" }}>
                          <DeleteIcon color="red.500" />
                        </div>
                      </div>
                    </td>
                  ) : null}
                  {tableTitle === "Users" && (
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to={`/admin/${_id}`}
                          style={{ marginRight: "7px", cursor: "pointer" }}
                        >
                          <EditIcon color="green.500" />
                        </Link>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>

      {tableData.tableBody.length > 10 && (
        <div className="pagination-div">
          <PaginationControl
            page={page}
            next={true}
            last={true}
            total={tableData.tableBody.length}
            limit={10}
            changePage={(page) => onChangePage(page)}
            ellipsis={1}
          />
        </div>
      )}
    </div>
  );
};

export default Datatable;
