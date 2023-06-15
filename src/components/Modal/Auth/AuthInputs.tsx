import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./Signup";

type AuthInputsProps = {};

export default function AuthInputs(): React.ReactElement {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction={"column"} align={"center"} width={"100%"} mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </Flex>
  );
}
