import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  useDisclosure,
  Center,
  Divider,
  Text,
  Avatar,
  VStack,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { TbDiscount2 } from "react-icons/tb";
import { GiMedicines, GiDoctorFace } from "react-icons/gi";
import { AiOutlineQuestionCircle, AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiHandSanitizerLine, RiMenuFoldFill } from "react-icons/ri";
import { IoBagOutline, IoWalletOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import NavSearch from "./NavSearch";
import Tabs from "./Tabs";
import { LoginIndividualSlider } from "../loginPages/QuickLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../redux/Cart/action";

function Navbar() {
  const token = localStorage.getItem("token") || false;
  const dispatch = useDispatch();
  const { cartItems, totalCount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartItems]);
  const tabs = [
    {
      title: "Home",
      path: "/",
      logo: <HiOutlineHome />,
    },
    {
      title: "Order Medicine",
      path: "/medicines",
      logo: <GiMedicines />,
    },
    {
      title: "HealthCare Products",
      path: "/healthcare",
      logo: <RiHandSanitizerLine />,
    },
    {
      title: "Consultation",
      path: "/consultation",
      logo: <GiDoctorFace />,
    },
    {
      title: "Offers",
      path: "/offers",
      logo: <TbDiscount2 />,
    },
    {
      title: "My Account",
      path: "/user",
      logo: <AiOutlineUser />,
    },
    {
      title: "Orders",
      path: "/cart",
      logo: <IoBagOutline />,
    },
    {
      title: "Wallet",
      path: "/wallet",
      logo: <IoWalletOutline />,
    },
    {
      title: "Need Help?",
      path: "/help",
      logo: <AiOutlineQuestionCircle />,
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box position={"relative"}>
      {scrollPosition > 200 && <Tabs />}
      <Box
        p="12px 40px 10px 40px"
        position="fixed"
        zIndex="4"
        bg="white"
        top="0"
        left="0"
        width="100%"
        boxShadow="rgb(0 0 0 / 12%) 0px -1px 0px inset"
        display="flex"
        justifyContent="space-between"
        height="65px"
      >
        <Flex>
          {windowWidth < 1024 && (
            <Box w="30px" display="flex" alignItems="center">
              <RiMenuFoldFill
                fontSize="20px"
                className="menuHover"
                onClick={onOpen}
              />
            </Box>
          )}
          {windowWidth < 1024 && scrollPosition < 101 && (
            <Box margin="auto">
              <Flex h="100%" w="100%" justify="start" align="end" mt="27px">
                <Image
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                  h="100px"
                  src="/images/512x512.png"
                />
              </Flex>
            </Box>
          )}
          {windowWidth > 1024 && (
            <Box>
              <Flex h="100%" w="100%" justify="start" align="end" mt="27px">
                <Image
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                  h="100px"
                  src="/images/512x512.png"
                />
              </Flex>
            </Box>
          )}
          {windowWidth > 1024 && (
            <Center pl="30px" pr="30px">
              <Divider orientation="vertical" />
            </Center>
          )}

          {windowWidth > 1024 && (
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="2px"
              >
                <Box>
                  <Image src="/images/express-delivery.svg" />
                </Box>
                <Box>
                  <Text fontSize="13px" mb="2px">
                    {" "}
                    Express delivery to
                  </Text>
                </Box>
              </Box>

              <Text fontSize="14px" align="right" pb="0" fontWeight="600">
                74600 Karachi <b>⌵</b>
              </Text>
            </Box>
          )}
        </Flex>

        <Flex align="center" justifyContent="end" gap="20px">
          {scrollPosition > 100 && <NavSearch />}
          {windowWidth > 1024 && (
            <Link className="hover_green">
              <Box display="flex" fontSize="14px">
                <Box display="flex" alignItems="center" mr="10px">
                  <AiOutlineUser fontSize="20px" />
                </Box>
                {windowWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    <LoginIndividualSlider />
                  </Box>
                )}
              </Box>
            </Link>
          )}
          {token && (
            <Link className="hover_green" to={"/orders"}>
              <Box display="flex" fontSize="14px">
                <Box display="flex" alignItems="center" mr="5px">
                  <TbDiscount2 fontSize="20px" />
                </Box>
                {windowWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    My Orders
                  </Box>
                )}
                {windowWidth < 1024 && windowWidth > 650 && (
                  <Box mt="2px" fontWeight="600">
                    My Orders
                  </Box>
                )}
              </Box>
            </Link>
          )}
          {token && (
            <Link className="hover_green" to={"/cart"}>
              <Box display="flex" fontSize="14px" pos={"relative"}>
                {
                  <Box display="flex" alignItems="center" mr="8px">
                    <FiShoppingCart fontSize="20px" />
                    <Center
                      border={"1px solid black"}
                      color="white"
                      fontSize={"10px"}
                      borderRadius="50%"
                      borderColor={"teal"}
                      bg="teal"
                      height={"16px"}
                      top={"-10px"}
                      left="10px"
                      pos={"absolute"}
                      paddingX="5px"
                    >
                      {token ? totalCount : 0}
                    </Center>
                  </Box>
                }
                {windowWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    Cart
                  </Box>
                )}
                {windowWidth < 1024 && windowWidth > 650 && (
                  <Box fontWeight="600" mt="2px">
                    Cart
                  </Box>
                )}
              </Box>
            </Link>
          )}
        </Flex>

        {/* left side menu DrawerContent */}

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="1px"
              bg="linear-gradient(106.34deg, rgb(112, 179, 171) 0%, rgb(54, 119, 114) 96.21%)"
            >
              <Box display="flex">
                <Box display="flex" alignItems="center">
                  <Avatar
                    bg="white"
                    icon={<AiOutlineUser color="#10847E" fontSize="1.5rem" />}
                  />
                </Box>
                <Box
                  fontSize="13px"
                  ml="15px"
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                  color="white"
                >
                  <Box fontSize="15px">Hi, there !</Box>
                  <Box>
                    <LoginIndividualSlider />
                  </Box>
                </Box>
              </Box>
            </DrawerHeader>
            <DrawerBody padding="0">
              <VStack align="left">
                {tabs.map((tab) => (
                  <Link
                    onClick={onClose}
                    className="link"
                    key={tab.path}
                    to={tab.path}
                  >
                    <HStack
                      padding="12px 24px"
                      cursor="pointer"
                      _hover={{ color: "#10847E" }}
                      spacing="20px"
                    >
                      {tab.logo}
                      <Text>{tab.title}</Text>
                    </HStack>
                    <Divider />
                  </Link>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box height="65px" width="100%"></Box>
    </Box>
  );
}

export default Navbar;
