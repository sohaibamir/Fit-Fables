import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";
import CartStack from "../components/cart/CartStack";
import OrderSummary from "../components/cart/OrderSummary";

function Cart() {
  const isAuth = localStorage.getItem("token") || false;

  if (!isAuth) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <Flex
      width="80%"
      margin="30px auto"
      justify={{
        base: "center",
        sm: "center",
        lg: "space-between",
        xl: "space-between",
      }}
      flexDir={{ base: "column", sm: "column", lg: "row", xl: "row" }}
    >
      <Box flexGrow={"1"} maxW={"700px"}>
        <HStack width={"100%"} justify={"space-between"}>
          <Text fontSize={"26px"} fontWeight="600" mb={"15px"}>
            Items in Cart
          </Text>
          <Text fontSize={"12px"}>Prices are indicative</Text>
        </HStack>
        <CartStack />
      </Box>
      <Box minW={"300px"} p={4}>
        <OrderSummary />
      </Box>
    </Flex>
  );
}

export default Cart;
