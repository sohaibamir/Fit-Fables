import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { getOrders, isAuthenticated } from "../api/api";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import Tabs from "../components/navbar/Tabs";

function MyOrders() {
  const [data, setData] = useState([]);
  const userId = isAuthenticated()._id;

  useEffect(() => {
    getOrders(userId)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Tabs />
      <Box
        w={{ base: "90%", sm: "90%", lg: "90%", xl: "80%" }}
        margin="80px auto"
        color={"rgba(0,0,0,0.7)"}
      >
        <HealthCareBreadcrumb title="Offers" />

        {data.length < 1 && (
          <Text textAlign={"center"} m={"50px auto"}>
            PLACE ORDER TO SHOW HERE
          </Text>
        )}

        {data.map((el) => (
          <Stack
            marginTop="1rem"
            key={el._id}
            border="1px solid black"
            padding={4}
            borderRadius="10px"
          >
            <Box>
              <Heading fontSize={"25px"}>
                Order Placed on: {el.createdAt.split("T")[0]}
              </Heading>
            </Box>

            {el.cartItems.map((el) => (
              <li
                style={{ display: "flex", justifyContent: "space-between" }}
                key={el._id}
              >
                {el.productId.title}
                <span>Quantity : {el.quantity}</span>
              </li>
            ))}
            <Heading fontSize={"18px"}>Total Price: Rs.{el.totalPrice}</Heading>
          </Stack>
        ))}
      </Box>
    </>
  );
}

export default MyOrders;
