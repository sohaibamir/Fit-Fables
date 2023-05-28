import { Box, Grid, Skeleton } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";

function ProductsGrid({ data, loading }) {
  const arr = [1, 2, 3, 4, 5, 6, 8, 9];
  return (
    <Grid
      width="100%"
      gridGap="20px"
      justifyItems={"center"}
      gridTemplateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(3,1fr)",
        lg: "repeat(4,1fr)",
        xl: "repeat(3,1fr)",
      }}
    >
      {loading &&
        arr.map((el) => (
          <Skeleton key={el} borderRadius={"10px"}>
            <Box width={"250px"} height="320px"></Box>
          </Skeleton>
        ))}
      {loading === false &&
        data.map((el) => (
          <ProductCard
            image={el.img1}
            title={el.title}
            newPrice={el.actual_price}
            originalPrice={el.crossed_price}
            brand={el.manufacturer}
            offer={Math.ceil(
              ((el.crossed_price - el.actual_price) / el.crossed_price) * 100
            )}
            id={el._id}
            key={el._id}
          />
        ))}
    </Grid>
  );
}

export default ProductsGrid;
