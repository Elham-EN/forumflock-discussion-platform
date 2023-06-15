import { Button, Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButton(): ReactElement {
  return (
    <>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        width={"80%"}
      >
        <Button
          variant={"outline"}
          borderColor={"gray.600"}
          color={"black"}
          _hover={{ bg: "gray.100" }}
          fontSize={"12pt"}
          fontWeight={700}
          width={"full"}
          size={"lg"}
          leftIcon={<FcGoogle />}
        >
          Continue with Google
        </Button>
      </Flex>
    </>
  );
}
