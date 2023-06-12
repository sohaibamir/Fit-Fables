import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../allApi";
import { getUserCart, isAuthenticated } from "../../api/api";
import { getSuccess } from "../../redux/auth/action";
import { setCart } from "../../redux/Cart/action";
import { LogOut } from "./LogOut";
import { QuickRegister } from "./QuickRegister";
import { useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
};

export function LoginIndividualSlider() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const role = isAuthenticated().role;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [user, setUser] = useState(initState);

  const dispatch = useDispatch();

  function getCart() {
    getUserCart()
      .then((res) => {
        dispatch(setCart(res.data.data.cartItems));
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await fetch(loginAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        if (jsonresponse.status === 200) {
          console.log("logged in", jsonresponse.user);
          localStorage.setItem("jwt", JSON.stringify(jsonresponse.user));

          dispatch(getSuccess(true));
          localStorage.setItem("isAuth", true);
          localStorage.setItem("token", jsonresponse.token);
          console.log(jsonresponse);
          toast({
            title: "Logged in Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          const jwt = JSON.parse(localStorage.getItem("jwt"));
          if (jwt.role === "admin") {
            navigate("/admin");
          } else if (jwt.role === "doctor") {
            navigate("/doctor");
          }
          onClose();
        } else {
          console.log(
            "error message",
            jsonresponse,
            "errorstatus",
            jsonresponse.status
          );
          toast({
            title: "Wrong Credentials! ",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log("error message");
        toast({
          title: "Wrong Credentials! ",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log(err);
      })
      .finally(getCart);

    setUser(initState);
  };

  return (
    <>
      {token ? (
        <Text>
          <LogOut />
        </Text>
      ) : (
        <Text
          onClick={onOpen}
          mb="0px"
          color="black"
          cursor="pointer"
          _hover={{ color: "#10847E" }}
        >
          Hello, Log in{" "}
        </Text>
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        position="relative"
        size={"xlg"}
      >
        <DrawerOverlay />
        <DrawerContent style={{ width: "100vw" }}>
          <DrawerCloseButton
            position="absolute"
            left={{ lg: "-50px", xl: "-50px", xlg: "-25px" }}
            top="30px"
            bg="#1f6560"
            py="20px"
            borderRadius="0"
            color="white"
            _hover={{ bg: "#1f6560" }}
            _active={{ bg: "#1f6560" }}
            fontSize="14px"
          />
          <DrawerHeader
            borderBottomWidth="1px"
            bg="#1f6560"
            minH="90px"
            align="end"
            py="0"
            pr="40px"
            pl="40px"
          >
            <Flex justify="space-between" h="100%" w="100%">
              <Flex
                h="100%"
                w="100%"
                justify="start"
                // py="10px"
                align="end"
                mt="20px"
              >
                <Image h="130px" src="/images/fit-fables-silver.png" />
              </Flex>
              <Flex
                align="end"
                w="50%"
                h="100%"
                // border="1px solid red"
                justify="end"
              ></Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody
            w="30vw"
            px="50px"
            m="auto"
            mt="6.5rem"
            maxHeight="370px"
            boxShadow="-2px 2px 40px -9px rgba(0,0,0,0.75);
-webkit-box-shadow: -2px 2px 40px -9px rgba(0,0,0,0.75);
-moz-box-shadow: -2px 2px 40px -9px rgba(0,0,0,0.75);"
            overflow="hidden"
            borderRadius="5px"
          >
            <Stack spacing="20px">
              <form onSubmit={handleLogin}>
                <Box>
                  <FormLabel
                    htmlFor="phone"
                    fontWeight="700"
                    py="12px"
                    color="#4f585e"
                  >
                    Quick Login
                  </FormLabel>
                  <Stack spacing="20px">
                    <Input
                      h="2.8rem"
                      ref={firstField}
                      type="email"
                      pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                      letterSpacing=".2px"
                      outline=".1px solid #159a94"
                      focusBorderColor="#159a94"
                      placeholder="Enter your Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />

                    <InputGroup h="2.8rem">
                      <Input
                        h="2.8rem"
                        letterSpacing=".2px"
                        outline=".1px solid #159a94"
                        focusBorderColor="#159a94"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="2rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Stack>
                </Box>
                <Button
                  w="100%"
                  h="2.8rem"
                  variant="#1f6560"
                  bg="#1f6560"
                  color="#fff"
                  _hover={{ bg: "#159a94" }}
                  type="submit"
                  mt="26px"
                >
                  Login
                </Button>
              </form>
            </Stack>
            <Text fontSize="12px" color="#4f585e" p="20px 0px 0px">
              By clicking continue, you agree with our{" "}
              <span style={{ color: "#159a94", cursor: "pointer" }}>
                {" "}
                Privacy Policy
              </span>
            </Text>
            <Flex align="center" justify="center">
              <QuickRegister
                color={"#159a94"}
                font={"13px"}
                onClick={() => onClose()}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
