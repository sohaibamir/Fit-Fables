import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { tabCards } from "../home/TabCarousal";

function Tabs() {
  return (
    <Box
      width="100%"
      bg="#EEF4FF"
      pos="fixed"
      top="65px"
      left="0"
      alignItems="end"
    >
      <HStack
        paddingY={"12px"}
        paddingX="20px"
        margin="0 auto"
        justifyContent="center"
        gap="25px"
      >
        {tabCards.map((tab) => (
          <Link key={tab.title} className="tabs" to={tab.path}>
            <Text
              m="0rem"
              fontSize={{ base: "10px", sm: "12px", lg: "14px", xl: "14px" }}
            >
              {tab.title}
            </Text>
          </Link>
        ))}
      </HStack>
    </Box>
  );
}

export default Tabs;
