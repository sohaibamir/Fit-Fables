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
  Image,
  Input,
  Stack,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../../allApi";
import { getUserCart } from "../../api/api";
import { getSuccess } from "../../redux/auth/action";
import { setCart } from "../../redux/Cart/action";
//   import GitAuthButton from "./GitAuthButton";
import { LogOut } from "./LogOut";
import { QuickRegister } from "./QuickRegister";

const initState = {
  email: "",
  password: "",
};

export function LoginIndividualSlider() {
  const auth = localStorage.getItem("isAuth");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [user, setUser] = useState(initState);

  // const {isAuth} = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cartItems, totalCount } = useSelector((state) => state.cart);

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
          console.log("logged in");

          dispatch(getSuccess(true));
          localStorage.setItem("isAuth", true);
          localStorage.setItem("token", jsonresponse.token);
          console.log(jsonresponse);
          toast({
            title: "User Logged in Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          onClose();
        } else {
          console.log(
            "aeoasjl error message",
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
      {auth ? (
        <Text>
          <LogOut />
        </Text>
      ) : (
        <Text
          onClick={onOpen}
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
            py="28px"
            borderRadius="0"
            color="white"
            _hover={{ bg: "#1f6560" }}
            _active={{ bg: "#1f6560" }}
            fontSize="14px"
          />
          <DrawerHeader
            borderBottomWidth="1px"
            bg="#1f6560"
            minH="110px"
            align="end"
            py="0"
            pr="40px"
            pl="40px"
          >
            <Flex justify="space-between" h="100%" w="100%">
              <Flex
                h="80%"
                w="50%"
                // border="1px solid red"
                justify="start"
                // py="10px"
                align="end"
              >
                <Image
                  h="62%"
                  src="https://assets.pharmeasy.in/web-assets/dist/fca22bc9.png"
                />
              </Flex>
              <Flex
                align="end"
                w="50%"
                h="100%"
                // border="1px solid red"
                justify="end"
              >
                <Image
                  h="75%"
                  src="https://assets.pharmeasy.in/web-assets/dist/1fe1322a.svg"
                />
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody w="32vw" px="50px" m="auto" mt="4rem">
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
              {/* <GitAuthButton></GitAuthButton> */}
            </Stack>
            <Text fontSize="12px" color="#4f585e" py="20px">
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
