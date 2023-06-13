import { Button } from "@chakra-ui/react";
import React from "react";

export default function AuthButtons(): React.ReactElement {
  return (
    <>
      <Button
        variant={"outline"}
        display={{ base: "none", sm: "flex" }}
        height={"38px"}
        width={{ base: "78px", md: "110px" }}
        mr={2}
      >
        Log In
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        height={"38px"}
        width={{ base: "78px", md: "110px" }}
        mr={2}
      >
        Sign Up
      </Button>
    </>
  );
}
