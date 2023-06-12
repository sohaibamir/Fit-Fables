import { Box, Flex, Image, Text, IconButton, Skeleton } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowProducts({ products, title, loading }) {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const productsPerPage = 7;

  const nextProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + productsPerPage < products.length
        ? prevIndex + productsPerPage
        : prevIndex
    );
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - productsPerPage >= 0 ? prevIndex - productsPerPage : prevIndex
    );
  };

  const displayedProducts = products.slice(
    currentIndex,
    currentIndex + productsPerPage
  );

  const productWidth = `${100 / productsPerPage}%`;

  return (
    <Box px="2rem" py="2rem">
      <Flex px="10px" justifyContent="space-between" mt="50px" mb="20px">
        <Text fontSize="xl" fontWeight="600">
          {title}
        </Text>
        <span>
          <IconButton
            fontSize="18px"
            bg="white"
            mr="2px"
            borderRadius="50%"
            onClick={prevProduct}
            icon={<AiOutlineArrowLeft />}
          />
          <IconButton
            fontSize="18px"
            bg="white"
            borderRadius="50%"
            onClick={nextProduct}
            icon={<AiOutlineArrowRight />}
          />
        </span>
      </Flex>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        {loading &&
          arr.map((el) => (
            <Skeleton marginRight="4px" key={el} borderRadius={"10px"}>
              <Box width={"200px"} height="217px"></Box>
            </Skeleton>
          ))}
        {!loading &&
          displayedProducts.map((product) => (
            <Box
              _hover={{
                lg: {
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  borderRadius: "10px",
                },
              }}
              cursor="pointer"
              key={product._id}
              width={productWidth}
              textAlign="center"
              onClick={() => navigate(`/product/${product._id}`)}
              mb="4"
            >
              <Image
                px="2.2rem"
                height="130px"
                src={product.img1}
                alt={product.title}
              />
              <Text mb="0px" px="4px" mt="2" fontWeight="500">
                {product.title.length > 40
                  ? product.title.substr(0, 40) + "..."
                  : product.title.substr(0, 40)}
              </Text>

              <Text fontSize="18px" mb="0px" mt="1" fontWeight="500">
                Rs. {product.actual_price}
              </Text>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}

export default ShowProducts;
