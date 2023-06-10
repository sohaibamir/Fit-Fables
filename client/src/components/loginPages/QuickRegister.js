import { useState, useRef } from "react";
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
  Select,
  useToast,
  FormControl,
  Image,
} from "@chakra-ui/react";
import { signupAPI } from "../../allApi";
import { getSuccess } from "../../redux/auth/action";
import { useDispatch } from "react-redux";

const initState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

export const QuickRegister = () => {
  const auth = localStorage.getItem("isAuth");
  const dispatch = useDispatch();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [user, setUser] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleReg = async (e) => {
    e.preventDefault();
    await fetch(signupAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
      }),
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        if (jsonresponse.status === 201) {
          console.log("logged in");
          dispatch(getSuccess(true));
          localStorage.setItem("isAuth", true);

          toast({
            title: "User Registered Successfully! Please login to continue",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          console.log(
            "error message",
            jsonresponse,
            "errorstatus",
            jsonresponse.status
          );
        }
      })
      .catch((err) => {
        console.log("error message");
        toast({
          title: "User Already Exists",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log(err);
      });

    setUser(initState);

    onClose();
  };
  return (
    <FormControl>
      {!auth && (
        <Text onClick={onOpen} fontSize="18px" color="#4f585e" py="20px">
          Don't have an account ?
          <span style={{ color: "#159a94", cursor: "pointer" }}> Sign Up</span>
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
                w="50%"
                justify="start"
                // py="10px"
                align="end"
                mt="20px"
              >
                <Image h="130px" src="/images/fit-fables-silver.png" />
              </Flex>
              <Flex align="end" w="50%" h="100%" justify="end"></Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody
            w="55vw"
            px="50px"
            m="auto"
            mt="5.5rem"
            maxHeight="440px"
            boxShadow="-2px 2px 40px -9px rgba(0,0,0,0.75);
-webkit-box-shadow: -2px 2px 40px -9px rgba(0,0,0,0.75);
-moz-box-shadow: -2px 2px 40px -9px rgba(0,0,0,0.75);"
            overflow="hidden"
            borderRadius="5px"
          >
            <Stack spacing="20px">
              <form onSubmit={handleReg}>
                <Box>
                  <FormLabel
                    htmlFor="phone"
                    fontWeight="700"
                    py="12px"
                    color="#4f585e"
                  >
                    Quick Register
                  </FormLabel>
                  <Stack spacing="20px">
                    <Flex direction="row">
                      <Input
                        mr="6px"
                        h="2.8rem"
                        w="44.5rem"
                        ref={firstField}
                        type="text"
                        letterSpacing=".2px"
                        outline=".1px solid #159a94"
                        focusBorderColor="#159a94"
                        placeholder="Enter your Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        ml="6px"
                        h="2.8rem"
                        w="44.5rem"
                        ref={firstField}
                        type="number"
                        letterSpacing=".2px"
                        outline=".1px solid #159a94"
                        focusBorderColor="#159a94"
                        placeholder="Enter your Phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                      />
                    </Flex>
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
                      <InputRightElement mt="2px" width="5rem">
                        <Button h="2rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <Flex direction="row">
                      <Select
                        mr="6px"
                        h="2.8rem"
                        ref={firstField}
                        letterSpacing=".2px"
                        outline=".1px solid #159a94"
                        focusBorderColor="#159a94"
                        placeholder="Select Gender"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                      <Input
                        ml="6px"
                        h="2.8rem"
                        w="44.5rem"
                        ref={firstField}
                        type="text"
                        letterSpacing=".2px"
                        outline=".1px solid #159a94"
                        focusBorderColor="#159a94"
                        placeholder="Enter your Address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        required
                      />
                    </Flex>
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
                  Register
                </Button>
              </form>
            </Stack>
            <Text fontSize="12px" color="#4f585e" py="20px">
              By clicking continue, you agree with our{" "}
              <span style={{ color: "#159a94", cursor: "pointer" }}>
                {" "}
                Privacy Policy
              </span>
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </FormControl>
  );
};
