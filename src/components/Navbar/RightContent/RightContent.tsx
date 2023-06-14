import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type RightContentProps = {};

export default function RightContent(): React.ReactElement {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
}
