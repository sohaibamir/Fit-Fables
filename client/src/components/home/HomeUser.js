import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TabCarousal from "./TabCarousal";
import SearchBar from "./SearchBar";
import LatestProducts from "./LatestProducts";
import ChooseUs from "./ChooseUs";
import { getLatestProducts } from "../../api/api";

function HomeUser() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // window.scrollTo(0, 0);
    getLatestProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box bg="radial-gradient(150px 150px at 95% 0%, rgba(253, 186, 43, 0.3) 0%, rgba(253, 186, 43, 0) 100%), radial-gradient(150px 150px at 5% 0%, rgba(120, 213, 242, 0.3) 0%, rgba(253, 186, 43, 0) 100%)">
      <SearchBar />
      <TabCarousal />
      <LatestProducts products={products} />
      <ChooseUs />
    </Box>
  );
}

export default HomeUser;
