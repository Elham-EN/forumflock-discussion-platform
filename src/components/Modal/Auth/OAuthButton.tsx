import { Button, Flex, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

export default function OAuthButton(): ReactElement {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
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
          isLoading={loading}
          onClick={() => signInWithGoogle()}
        >
          Continue with Google
        </Button>
        {error && <Text color={"red.300"}>{error.message}</Text>}
      </Flex>
    </>
  );
}
