import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/action";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/api";

export function LogOut() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  // const user = state ? state.user : null;
  const name = isAuthenticated().name;
  const [username, setusername] = useState("User");
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      name ? setusername(name) : setusername("user");
    }
  }, [name]);
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logoutUser());
    onClose();
  };

  return (
    <>
      {isAuthenticated().role !== "admin" && (
        <Button
          color="black"
          bg={"transparent"}
          _hover={{ backgroundColor: "transparent", color: "teal" }}
          p="4px"
          onClick={onOpen}
          display="flex"
          mt="14px"
        >
          {username}
        </Button>
      )}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Log Out?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to <span color="#10847e">Log Out</span> ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              bg="#10847e"
              color="white"
              ml={3}
              onClick={() => {
                handleLogOut();
                navigate("/");
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
