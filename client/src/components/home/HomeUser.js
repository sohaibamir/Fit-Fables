import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import TabCarousal from "./TabCarousal";
import SearchBar from "./SearchBar";
import ChooseUs from "./ChooseUs/ChooseUs";
import LatestProducts from "./LatestProducts/LatestProducts";

function HomeUser() {
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  return (
    <Box bg="radial-gradient(150px 150px at 95% 0%, rgba(253, 186, 43, 0.3) 0%, rgba(253, 186, 43, 0) 100%), radial-gradient(150px 150px at 5% 0%, rgba(120, 213, 242, 0.3) 0%, rgba(253, 186, 43, 0) 100%)">
      <SearchBar />
      <TabCarousal />
      <LatestProducts />
      <ChooseUs />
    </Box>
  );
}

export default HomeUser;
