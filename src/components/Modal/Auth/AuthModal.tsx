/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButton from "./OAuthButton";
import ResetPassword from "./ResetPassword";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

export default function AuthModal() {
  // To read and write an from a component, similar to React' useState
  const [modalState, setModalState] = useRecoilState(authModalState);

  // Uses auth.onAuthStateChanged so is only triggered when a user signs
  // in or signs out. It return  user object if logged in, or null if not
  // initially user is null and loading is true because it is going to
  // check if there is currently authenticated user and onces loading is
  // done, you either get user or null.
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // if there is user logged in, then close the modal
    if (user) handleClose();
  }, [user]);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" ? "Login" : "Signup"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              w={"full"}
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButton />
                  <Flex my={8} align={"center"}>
                    <Divider borderColor={"gray.400"} width={"130px"} />
                    <Text mx={3}>OR</Text>
                    <Divider borderColor={"gray.400"} width={"130px"} />
                  </Flex>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
