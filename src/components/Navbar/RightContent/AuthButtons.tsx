import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

export default function AuthButtons(): React.ReactElement {
  // selectors are used to calculate derived data that is based on state.
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant={"outline"}
        display={{ base: "none", sm: "flex" }}
        height={"48px"}
        width={{ base: "78px", md: "180px" }}
        mr={2}
        fontSize={"16px"}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        height={"48px"}
        width={{ base: "78px", md: "180px" }}
        mr={2}
        fontSize={"16px"}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
}
