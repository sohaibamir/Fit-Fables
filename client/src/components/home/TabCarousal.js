import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export const tabCards = [
  {
    title: "Medicine",
    path: "/Medicine",
    img: "/images/medicine.webp",
  },
  {
    title: "Consultation",
    path: "/consultation",
    img: "/images/consultation.webp",
  },
  {
    title: "Healthcare",
    path: "/healthcare",
    img: "/images/healthcare.webp",
  },
  {
    title: "Health Blogs",
    path: "/health-blogs",
    img: "/images/healthblogs.webp",
  },
  {
    title: "Offers",
    path: "/offers",
    img: "/images/offers.webp",
  },
  {
    title: "Surgical",
    path: "/Surgical",
    img: "/images/surgical.webp",
  },
  {
    title: "Fitness",
    path: "/Fitness",
    img: "/images/vitamins.png",
  },
];

function TabCarousal() {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scroll, setScroll] = useState(0);

  function onScrollY() {
    document.getElementById("scrollBar").scrollLeft += 400;
    setScroll((prev) => prev + 400);
  }
  function onScrollX() {
    document.getElementById("scrollBar").scrollLeft -= 400;
    setScroll((prev) => prev - 400);
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);
  return (
    <Box
      width="100%"
      paddingLeft={{ base: "10px", sm: "20px", lg: "50px", xl: "50px" }}
      paddingRight={{ base: "10px", sm: "20px", lg: "50px", xl: "50px" }}
      mt="80px"
    >
      <Box width="100%" position="relative">
        {windowWidth > 1024 && scroll > 0 && (
          <IconButton
            onClick={onScrollX}
            bg={"rgba(0,0,0,0.4)"}
            position="absolute"
            top="20"
            left="-5"
            borderRadius="50%"
            icon={<AiOutlineLeft color="white" />}
          ></IconButton>
        )}

        <Flex
          paddingX={"10px"}
          width="100%"
          gap={{ base: "10px", lg: "40px", sm: "30px" }}
          overflowX="hidden"
          overflowY="hidden"
          paddingY={5}
          className="hideScroll"
          id="scrollBar"
          scrollBehavior="smooth"
          textAlign={"center"}
        >
          {tabCards.map((tab) => (
            <Box
              // maxWidth="190px"
              minW={{ base: "85px", sm: "110px", lg: "130px" }}
              key={tab.title}
              _hover={{
                lg: {
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  borderRadius: "10px",
                },
              }}
              cursor="pointer"
              paddingX="12px"
              onClick={() => navigate(tab.path)}
            >
              <Image
                // mb="10px"
                borderBottom={{
                  base: "transparent",
                  sm: "transparent",
                  lg: "1px solid rgba(0,0,0,0.2)",
                }}
                src={tab.img}
                bg={{
                  base: "#BFEDDD",
                  sm: "#BFEDDD",
                  lg: "transparent",
                }}
                borderRadius={{
                  base: "10px",
                  sm: "10px",
                  lg: "5px 5px 0 0",
                  xl: "5px 5px 0 0",
                }}
              ></Image>

              <Text
                fontSize={{ base: "12px", sm: "15px", lg: "16px" }}
                fontWeight="500"
                mb={2}
              >
                {tab.title}
              </Text>
            </Box>
          ))}
        </Flex>
        {windowWidth > 1024 && scroll < 450 && (
          <IconButton
            onClick={onScrollY}
            bg={"rgba(0,0,0,0.4)"}
            position="absolute"
            top="20"
            right="-5"
            borderRadius="50%"
            icon={<AiOutlineRight color="white" />}
          ></IconButton>
        )}
      </Box>
    </Box>
  );
}

export default TabCarousal;
