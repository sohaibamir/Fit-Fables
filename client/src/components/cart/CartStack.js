import { Center, Image, Skeleton, VStack } from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartProduct from "./CartProduct";

function CartStack() {
  const dispatch = useDispatch();
  const { cartItems, totalCount } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  console.log(cartItems);

  if (cartItems.length < 1) {
    return (
      <Center>
        <Image src="https://shop.millenniumbooksource.com/static/images/cart1.png"></Image>
      </Center>
    );
  }

  return (
    <VStack width={"100%"}>
      {cartItems.map((el) =>
        !loading ? (
          <CartProduct key={el.id} data={el} />
        ) : (
          <Skeleton key={`skeleton-${el.id}`}>
            {" "}
            <CartProduct key={el.id} data={el} />
          </Skeleton>
        )
      )}
    </VStack>
  );
}

export default CartStack;
