import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

interface AuthButtonsProps {
  displayType: string;
}

export default function AuthButtons({
  displayType = "none",
}: AuthButtonsProps): React.ReactElement {
  // selectors are used to calculate derived data that is based on state.
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex direction={"row"} width={"full"} justify={"center"}>
      <Button
        flexGrow={1}
        variant={"outline"}
        display={{ base: displayType, sm: "flex" }}
        height={"38px"}
        width={{ base: "78px", md: "180px" }}
        mr={2}
        fontSize={"18px"}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
        id="login-button"
        _hover={{
          boxShadow: "dark-lg",
          bg: "brand.100",
          color: "white",
        }}
      >
        Log In
      </Button>
      <Button
        flexGrow={1}
        display={{ base: displayType, sm: "flex" }}
        height={"38px"}
        width={{ base: "78px", md: "180px" }}
        mr={2}
        fontSize={"18px"}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
        id="signup-button"
        _hover={{ bg: "brand.200" }}
      >
        Sign Up
      </Button>
    </Flex>
  );
}
