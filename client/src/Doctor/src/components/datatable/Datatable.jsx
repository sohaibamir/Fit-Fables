import "./datatable.scss";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "react-bootstrap-pagination-control";
// import CustomBadge from "../customBadge/CustomBadge";

// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogCloseButton,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   Button,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";

const Datatable = ({ tableData, setIsDataUpdated }) => {
  const [data, setData] = useState(tableData.tableBody);
  const [page, setPage] = useState(1);

  // let objectId = "";
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = useRef();
  // const toast = useToast();

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
    <>
      <div className="datatable">
        <Table striped style={{ margin: "0px", padding: "0px" }}>
          <thead>
            {tableData?.tableHeader?.length > 0 && (
              <tr style={{ textAlign: "center" }}>
                {tableData?.tableHeader?.map((value) => {
                  return (
                    <td
                      key={value}
                      style={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      {value.toUpperCase()}
                    </td>
                  );
                })}
              </tr>
            )}
          </thead>

          {data?.length > 0 && (
            <tbody>
              {data?.map(({ _id, img1, ...eachRecord }) => {
                return (
                  <tr
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      paddingTop: "auto",
                      paddingBottom: "auto",
                    }}
                  >
                    {Object.values(eachRecord)?.map((value) => {
                      return (
                        <td>{value}</td>
                      )
                    })}
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
    </>
  );
};

export default Datatable;
