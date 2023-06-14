import "./datatable.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AiFillEye } from "react-icons/ai";
import CustomBadge from "../customBadge/CustomBadge";
import { deleteDoctor, deleteProduct } from "../../../../api/api";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const Datatable = ({ tableTitle, tableData, setIsDataUpdated }) => {
  const [data, setData] = useState(tableData.tableBody);
  const [page, setPage] = useState(1);

  let objectId = "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    onChangePage(page);
  }, [tableData]);

  const onChangePage = (page) => {
    const offset = (page - 1) * 10;
    let changePage = tableData.tableBody.slice(offset, offset + 10);
    setPage(page);
    setData(changePage);
  };

  const handleDelete = (id) => {
    if (tableTitle === "Doctors") {
      deleteDoctor(id).then((res) => {
        console.log('res', res);
        setIsDataUpdated((prev) => !prev);
        setPage(1);
        onClose();
        toast({
          title: "Record Deleted Successfully!",
          status: "success",
          duration: 3500,
          isClosable: true,
          position: "top",
        });
      })
        .catch((error) => console.log(error));
    }
    else if (tableTitle === "Products") {
      deleteProduct(id).then((res) => {
        console.log('res', res);
        setIsDataUpdated((prev) => !prev);
        setPage(1);
        onClose();
        toast({
          title: "Product Deleted Successfully!",
          status: "success",
          duration: 3500,
          isClosable: true,
          position: "top",
        });
      })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
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
                    {Object.values(eachRecord)?.map((value) => {
                      return (
                        <td>{(value == "Pending" || value == "In-process" || value == "Delivered") ? <CustomBadge bgColor={value == "Pending" ? "danger" : value == "In-process" ? "primary" : "success"} badgeText={value} /> : value}</td>
                      )
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
                            <DeleteIcon color="red.500" onClick={onOpen} />
                          </div>
                        </div>
                      </td>
                    )
                      : tableTitle === "Doctors" ?
                        <td>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Link to={`/admin/doctors/${_id}`} style={{ marginRight: "7px", cursor: 'pointer' }}>
                              <EditIcon color="green.500" />
                            </Link>
                            <div style={{ cursor: 'pointer' }}>
                              <DeleteIcon color="red.500" onClick={onOpen} />
                            </div>
                          </div>
                        </td>
                        :
                        tableTitle === "Orders" || tableTitle ===  "Last Transactions" ?
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Link to={`/admin/orders/${eachRecord?.orderId}`} style={{ marginRight: "7px", cursor: 'pointer' }}>
                                <AiFillEye style={{ color: "#38A169", fontSize: "18px" }} />
                              </Link>
                            </div>
                          </td>
                          : null
                    }

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
                            <AiFillEye style={{ color: "#38A169", fontSize: "18px" }} />
                          </Link>
                        </div>
                      </td>
                    )}

                    <span style={{ display: "none" }}>{objectId = _id}</span>
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

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {tableTitle === "Doctors" ?
              <span color="#10847e">Are you sure you want to delete this record ?</span>
              :
              tableTitle === "Products" &&
              <span color="#10847e">Are you sure you want to delete this product ?</span>
            }
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              bg="#10847e"
              color="white"
              ml={3}
              onClick={() => handleDelete(objectId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Datatable;
