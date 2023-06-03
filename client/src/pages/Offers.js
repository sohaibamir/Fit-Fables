import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Select,
  Text,
  VStack,
  Button,
  CheckboxGroup,
} from "@chakra-ui/react";

import ProductsGrid from "../components/products/ProductGrid";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";

import Tabs from "../components/navbar/Tabs";

import { CloseIcon } from "@chakra-ui/icons";
import { getAllOfferProducts } from "../api/api";

function Offer() {
  const getCurrPage = (value) => {
    value = Number(value);

    if (value <= 0) {
      value = 1;
    }
    if (!value) {
      value = 1;
    }

    return value;
  };
  let arr = [];
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState(search.get("sortBy") || "");
  const [page, setPage] = useState(getCurrPage(search.get("page")) || 1);
  const [filterArr, setFilterArr] = useState(search.getAll("brand") || []);
  const [filters, setFilters] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  function handleCheckedState(el) {
    if (filterArr.includes(el)) {
      setFilterArr([...filterArr.filter((e) => e !== el)]);
    } else {
      setFilterArr([...filterArr, el]);
    }
  }

  // console.log(filterArr);
  useEffect(() => {
    setLoading(true);

    getAllOfferProducts(page, sortBy)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.offerProducts);
        setTotalProducts(res.data.totalProducts);
        setFilters(res.data.totalBrands);
        setTotalPages(Math.ceil(res.data.totalProducts / res.data.pageSize));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, filterArr, sortBy]);
  if (page > totalPages) {
    setPage(totalPages);
  }
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  useEffect(() => {
    let paramObj = { page };
    if (sortBy) {
      paramObj.sortBy = sortBy;
    }

    if (filterArr) {
      paramObj.brand = filterArr;
    }

    setSearch(paramObj);
  }, [page, filterArr, sortBy]);

  for (let i = 0; i < totalPages; i++) arr[i] = i + 1;

  return (
    <>
      <Tabs />
      <Box
        w={{ base: "90%", sm: "90%", lg: "90%", xl: "80%" }}
        margin="80px auto"
        color={"rgba(0,0,0,0.7)"}
      >
        <HealthCareBreadcrumb title="Offers" />
        <Flex mt={10} justifyContent="space-between">
          <Box
            display={{ base: "none", xl: "block" }}
            width="250px"
            minW={"250px"}
          >
            <VStack alignItems="start" width="100%">
              <Text fontSize="26px" fontWeight="600" mb="40px">
                Filter
              </Text>

              <Box width="100%">
                <Text fontSize={"16px"} fontWeight="700" mb="20px">
                  Brand
                </Text>

                <VStack
                  height="50rem"
                  overflow="hidden scroll"
                  spacing={"20px"}
                  pr="10px"
                  width={"100%"}
                >
                  <CheckboxGroup defaultValue={filterArr}>
                    {filters &&
                      filters.map((el) => (
                        <HStack key={el} width={"100%"} justify="space-between">
                          <Text mb="0px" fontSize={"14px"} fontWeight="400">
                            {el}
                          </Text>
                          <Checkbox
                            onChange={() => handleCheckedState(el)}
                            checked={filterArr.includes(el)}
                            border={"grey"}
                            colorScheme="teal"
                            value={el}
                          ></Checkbox>
                        </HStack>
                      ))}
                  </CheckboxGroup>
                </VStack>
              </Box>
            </VStack>
          </Box>
          <Box flexGrow={1} ml={{ xl: "50px" }}>
            <HStack
              flexWrap={"wrap"}
              justifyContent={{
                base: "center",
                sm: "space-between",
                lg: "space-between",
                xl: "space-between",
              }}
              alignItems={"center"}
              mb="40px"
            >
              <Box>
                <Text fontSize="26px" fontWeight="600">
                  {"Offers "}({totalProducts})
                </Text>
              </Box>
              <HStack>
                <Text mb="0px" noOfLines={1}>
                  Sort By:
                </Text>
                <Box>
                  <Select
                    colorScheme={"teal"}
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    placeholder="Popularity"
                  >
                    <option value="asc">Price low to high </option>
                    <option value="desc">Price high to low </option>
                  </Select>
                </Box>
              </HStack>
            </HStack>
            {
              <HStack
                flexWrap={"wrap"}
                gap="10px"
                flexDir={{ base: "column", sm: "row" }}
                mb="20px"
              >
                <Text fontSize={"12px"}></Text>
                {filterArr.map((e) => {
                  return (
                    <Button
                      key={e}
                      mr={"10px"}
                      size={"xs"}
                      rightIcon={
                        <CloseIcon
                          onClick={() => handleCheckedState(e)}
                          fontSize={"8px"}
                        />
                      }
                      variant={"outline"}
                      colorScheme={"teal"}
                    >
                      {e}
                    </Button>
                  );
                })}
              </HStack>
            }
            <ProductsGrid data={products} loading={loading} />

            {
              <HStack mt={"50px"} justify="center" spacing={"5px"}>
                {arr.map((el) => {
                  if (el > +page + 3 && el !== +page && el !== +totalPages) {
                    return <Text key={el}>.</Text>;
                  }
                  return (
                    <Button
                      variant={"outline"}
                      padding="0"
                      size={"sm"}
                      colorScheme={"teal"}
                      onClick={() => setPage(el)}
                      disabled={page === el}
                      key={el}
                    >
                      {el}
                    </Button>
                  );
                })}
              </HStack>
            }
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Offer;
