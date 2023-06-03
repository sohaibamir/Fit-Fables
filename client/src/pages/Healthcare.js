import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import Cards from "../components/healthcare/Cards";
import Tabs from "../components/navbar/Tabs";

const Healthcare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Tabs />

      <Box width="85%" margin="80px auto">
        <HealthCareBreadcrumb title="Healthcare" />

        <Cards></Cards>
      </Box>
    </>
  );
};

export default Healthcare;
