import "./viewOrderDetails.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";
import DropDown from "../../components/dropdown/DropDown";
import { useEffect, useState } from "react";
import {
  getOrderById,
  getProductsOfSingleOrder,
  updateOrderById,
} from "../../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, useToast } from "@chakra-ui/react";
import { Box, Image, Text } from "@chakra-ui/react";

const ViewOrderDetails = ({ inputs, title }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(orderId)
      .then((res) => {
        console.log("res", res);
        setOrder(res?.data?.data);
        setStatus(res?.data?.data?.status);
      })
      .catch((error) => console.log(error));

    getProductsOfSingleOrder(orderId).then((res) => {
      console.log("res", res);
      setProducts(res?.data?.products);
    });
  }, []);

  const { cartItems, ...remainingObj } = order;

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "In-process", label: "In-process" },
    { value: "Delivered", label: "Delivered" },
  ];

  const handleSave = () => {
    updateOrderById(orderId, status)
      .then((res) => {
        console.log("res", res);
        const updatedOrder = res?.data?.data;

        if (updatedOrder) {
          toast({
            title: "Order Status Updated Successfully!",
            status: "success",
            duration: 3500,
            isClosable: true,
            position: "top",
          });
          navigate("/admin/orders");
        }
      })
      .catch((error) => console.log(error));
  };

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
                    {input?.label === "Order Status" ? (
                      <DropDown
                        variant={"filled"}
                        options={options}
                        value={status}
                        setter={setStatus}
                      />
                    ) : (
                      <input
                        disabled={true}
                        className="inputsOfOrderInfo"
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={
                          input?.label === "Items In Cart"
                            ? cartItems?.length
                            : order[input.name]
                        }
                      />
                    )}
                  </Col>
                );
              })}

              <Row style={{ margin: "10px 0px 15px" }}>
                <Heading size="md" m="1rem 0rem" style={{ color: "#55585e" }}>
                  Products Ordered
                </Heading>
                {products?.map((product) => {
                  return (
                    <Col lg={2}>
                      <Box
                        _hover={{
                          lg: {
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                            borderRadius: "10px",
                          },
                        }}
                        cursor="pointer"
                        key={product?._id}
                        textAlign="center"
                        mb="4"
                        pb="4px"
                      >
                        <Image
                          px="2.2rem"
                          height="130px"
                          src={product?.img1}
                          alt={"Sorry! Image Not Available"}
                        />
                        <Text mb="0px" px="4px" mt="2" fontWeight="500">
                          {product?.title?.length > 40
                            ? product?.title.substr(0, 30) + "..."
                            : product?.title.substr(0, 35)}
                        </Text>

                        <div className="price-and-quantity-div">
                          <Text fontSize="18px" mb="0px" mt="1" fontWeight="500">
                            Rs. {product?.actual_price}
                          </Text>
                          <span>{product?.quantity}</span>
                        </div>
                      </Box>
                    </Col>
                  );
                })}
              </Row>

              <Col lg={12}>
                <button style={{ width: "150px" }} onClick={handleSave}>
                  Save
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
