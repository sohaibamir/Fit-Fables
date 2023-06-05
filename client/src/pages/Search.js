import {
  Box,
  Button,
  Flex,
  Center,
  Heading,
  Hide,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSearchProducts } from "../api/api";
import { getCartTotal } from "../redux/Cart/action";

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSearchProducts(name);
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    dispatch(getCartTotal());
  }, []);

  return (
    <Box
      display="flex"
      w={{ base: "90%", sm: "90%", md: "90%", lg: "90%", xl: "70%" }}
      m="auto"
      justifyContent="space-between"
      my="30px"
    >
      {/* Left */}
      {loading ? (
        <Center>Loading...</Center>
      ) : data.length > 0 ? (
        <Box
          w={{ base: "90%", sm: "90%", md: "90%", lg: "60%", xl: "60%" }}
          display="flex"
          gap={"20px"}
          flexDirection="column"
        >
          {/* 1 product */}
          <Heading p={4} fontSize="25px" color="#4f585e">
            Showing all results for <span fontWeight="bold">{name}</span>
          </Heading>

          {data.map((el) => (
            <Flex
              key={el._id}
              px={6}
              py={5}
              border="1px solid #a7bdd3"
              borderRadius="10px"
              cursor="pointer"
              onClick={() => navigate(`/healthcare/product/${el._id}`)}
            >
              <Box mr="20px">
                <Image mr="20px" w="50px" p="5px" src={el.img1} alt="" />
              </Box>
              <Flex flexDirection="column" flex>
                <Heading
                  mb="10px"
                  fontSize={{
                    base: "18px",
                    sm: "18px",
                    md: "18px",
                    lg: "22px",
                    xl: "22px",
                  }}
                  color="#4f585e"
                >
                  {el.title}
                </Heading>
                <Text mb="10px" fontWeight="" color="#8897a4">
                  By {el.manufacturer}
                </Text>

                <Flex
                  justifyContent="space-between"
                  flexDirection={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                  }}
                >
                  <Flex>
                    <Heading mr="5px" fontSize="22px" color="#4f585e">
                      Rs {el.actual_price}
                    </Heading>
                    {el.crossed_price && (
                      <Text color="#8897a4" mx="5px" mt="4px">
                        MRP{" "}
                        <Text as="s" mr="5px" color="red">
                          Rs {el.crossed_price}
                        </Text>
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Box>
      ) : (
        <Center>NO PRODUCTS FOUND TRY WITH A DIFFERENT KEYWORD</Center>
      )}
      {/* Right */}
      <Hide below="lg">
        <Box w="400px" p={4}>
          <Text p={3} fontWeight="bold" fontSize="20px" color="#4f585e">
            Please add item(s) to proceed
          </Text>
          <Button
            mb="20px"
            w="100%"
            onClick={() => navigate("/cart")}
            colorScheme={"teal"}
            p={7}
            mt="10px"
            fontSize="22px"
            _hover={{ bg: "#959595" }}
          >
            View Cart
          </Button>
          <Box
            color="#4f585e"
            p={4}
            border="1px solid #a7bdd3"
            borderRadius="10px"
          >
            <Center p={4} borderBottom="1px solid #a7bdd3">
              <Text mb="0px" fontWeight="bold">
                What is a valid prescription ?
              </Text>
            </Center>
            <Text my="20px">A valid prescription contains:</Text>
            <Flex mb="10px">
              <Image
                mr="20px"
                w="40px"
                h="40px"
                p="5px"
                src="https://cdn-icons-png.flaticon.com/512/1107/1107126.png"
              />
              <Text mb="0px" p={2}>
                Doctor Details
              </Text>
            </Flex>
            <Flex mb="10px">
              <Image
                mr="20px"
                w="40px"
                h="40px"
                p="5px"
                src="https://cdn0.iconfinder.com/data/icons/office-83/32/calendar-info-512.png"
              />
              <Text mb="0px" p={2}>
                Date of Prescription
              </Text>
            </Flex>
            <Flex mb="10px">
              <Image
                mr="20px"
                w="40px"
                h="40px"
                p="5px"
                src="https://icon-library.com/images/account-icon/account-icon-13.jpg"
              />
              <Text mb="0px" p={2}>
                Patient Details
              </Text>
            </Flex>
            <Flex mb="10px">
              <Image
                mr="20px"
                w="40px"
                h="40px"
                p="5px"
                src="https://www.viscotec.de/media/Pharma-ViscoTec-Icon.png"
              />
              <Text mb="0px" p={2}>
                Dosage Details
              </Text>
            </Flex>
          </Box>
        </Box>
      </Hide>
    </Box>
  );
}

export default Search;
