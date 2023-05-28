import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/api";
import Product from "../components/singleProduct/Product";

function SingleProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getSingleProduct(id)
      .then((res) => setProductData(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Product data={productData} />
    </Box>
  );
}

export default SingleProduct;
