import "./viewOrderDetails.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Col, Row } from 'react-bootstrap'
import DropDown from "../../components/dropdown/DropDown";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderById } from "../../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ViewOrderDetails = ({ inputs, title }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(orderId).then((res) => {
      console.log('res', res);
      setOrder(res?.data?.data);
    })
      .catch((error) => console.log(error));
  }, []);

  const { cartItems, ...remainingObj } = order;

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "In-process", label: "In-process" },
    { value: "Delivered", label: "Delivered" },
  ];

  const handleSave = () => {
    updateOrderById(orderId, status).then((res) => {
      console.log('res', res);
      const updatedOrder = res?.data?.data;

      if (updatedOrder) {
        toast({
          title: "Order Status Updated Successfully!",
          status: "success",
          duration: 3500,
          isClosable: true,
          position: "top"
        });
        navigate("/admin/orders");
      }
    })
      .catch((error) => console.log(error));
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title && title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <Row>
              {inputs.map((input) => {
                return (
                  <Col key={input.id} lg={6} style={{ marginBlock: "12px" }}>
                    <label className="labelsOfOrderInfo">{input.label}</label>
                    {input?.label == "Order Status" ? <DropDown variant={"filled"} options={options} setter={setStatus} /> :
                      <input
                        disabled={true}
                        className="inputsOfOrderInfo"
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={input?.label == "Items In Cart" ? cartItems?.length : order[input.name]}
                      />}
                  </Col>
                )
              })}
              <Col lg={12}>
                <button style={{ width: "150px" }} onClick={handleSave}>Save</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
