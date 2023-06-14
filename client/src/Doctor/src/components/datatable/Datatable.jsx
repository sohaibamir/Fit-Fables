import "./datatable.scss";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "react-bootstrap-pagination-control";
import DropDown from "../dropdown/DropDown";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Button
} from "@chakra-ui/react";
import { updateAppointmentStatus } from "../../../../api/api";

const Datatable = ({ tableData, setIsDataUpdated }) => {
  const [data, setData] = useState(tableData?.tableBody);
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const doctor = JSON.parse(localStorage.getItem("jwt"));
  const doctorId = doctor?._id;

  useEffect(() => {
    onChangePage(page);
  }, [tableData]);

  const onChangePage = (page) => {
    const offset = (page - 1) * 10;
    let changePage = tableData.tableBody.slice(offset, offset + 10);
    setPage(page);
    setData(changePage);
  };

  const [status, setStatus] = useState();

  let userEmail = "";

  const options = [
    { value: "Remaining", label: "Remaining" },
    { value: "Completed", label: "Completed" },
  ];

  const handleDelete = (email) => {
    updateAppointmentStatus(doctorId, email).then((res) => {
      console.log('status res', res);
      toast({
        title: "Record Deleted Successfully!",
        status: "success",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
      navigate("/doctor/completed-appointments");
    });
  }

  return (
    <>
      <div className="datatable">
        {data?.length === 0 ? <h2>No Appointments!</h2> :
          <>
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
                  {data?.map((eachRecord) => {
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
                            <td>{value === "Remaining" ? <DropDown variant={"danger"} options={options} setter={setStatus} value={status} /> : value}</td>
                          )
                        })}

                        <td>{status === "Completed" && <DeleteIcon onClick={onOpen} color="red.500" style={{ fontSize: "18px", cursor: "pointer" }} />}</td>

                        <span style={{ display: "none" }}>{userEmail = eachRecord?.email}</span>
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
          </>
        }
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
            <span color="#10847e">Have you completed this appointment ?</span>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              bg="#10847e"
              color="white"
              ml={3}
              onClick={() => handleDelete(userEmail)}
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
