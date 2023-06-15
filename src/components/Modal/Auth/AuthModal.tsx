import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import AuthInputs from "./AuthInputs";

export default function AuthModal() {
  // To read and write an from a component, similar to React' useState
  const [modalState, setModalState] = useRecoilState(authModalState);

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
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
