import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { deleteCartItem, isAuthenticated } from "../../api/api";
import { remove } from "../../redux/Cart/action";
import QuantitySelecter from "./QantitySelector";

function CartProduct(props) {
  const { data } = props;
  const userId = isAuthenticated()._id;

  const { productId, quantity } = data;
  const dispatch = useDispatch();
  function removeItem(id) {
    deleteCartItem(productId._id, userId)
      .then((res) => {
        console.log(res);
        dispatch(remove(id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <HStack
      p={4}
      gap="20px"
      border={"1px solid grey"}
      borderRadius="10px"
      minW={{ lg: "500px" }}
      width="100%"
      justifyContent={"space-between"}
    >
      <Box width={"100px"} height="60px">
        <Image
          width="100%"
          height="100%"
          src={productId.img1}
          objectFit="fill"
        ></Image>
      </Box>
      <Box width={"100%"}>
        <HStack alignItems={"flex-start"} justify={"space-between"}>
          <Text mb="0px" fontWeight={"500"} noOfLines="2">
            {productId.title}
          </Text>

          <DeleteIcon
            _hover={{ color: "red" }}
            cursor="pointer"
            onClick={() => removeItem(productId._id)}
            fontSize={"16px"}
          />
        </HStack>
        <Text fontSize={"14px"} color="rgba(0,0,0,0.6)" mb={"6px"}>
          By {productId.manufacturer}
        </Text>

        <HStack justify={"space-between"}>
          <QuantitySelecter id={productId._id} amount={quantity} />
          <VStack>
            {productId.crossed_price && (
              <HStack>
                <Text mb="0px" fontSize={"12px"} textDecor={"line-through"}>
                  Rs {productId.crossed_price}
                </Text>
                <Text fontSize={"12px"} color="red">
                  {Math.ceil(
                    ((productId.crossed_price - productId.actual_price) /
                      productId.crossed_price) *
                      100
                  )}
                  % OFF
                </Text>
              </HStack>
            )}
            <Text textAlign={"right"} fontSize={"14px"} fontWeight="600">
              Rs {parseFloat((productId.actual_price * quantity).toFixed(2))}
            </Text>
          </VStack>
        </HStack>
        <Text mb="0px" fontSize={"14px"} color="rgba(0,0,0,0.6)">
          Delivery by 14 June
        </Text>
      </Box>
    </HStack>
  );
}

export default CartProduct;
