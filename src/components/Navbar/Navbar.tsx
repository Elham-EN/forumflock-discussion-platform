import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";

export default function Navbar(): React.ReactElement {
  return (
    <Flex bg={"white"} height={"70px"} padding={"6px 3px"}>
      <Flex align={"center"}>
        <Image
          src="/images/fedditLogo1.png"
          alt="Feddit Logo"
          height={"50px"}
          display={{ base: "none", md: "unset" }}
        />
        <Image
          src="/images/fedditLogoNoText1.png"
          alt="Feddit Logo"
          height={"40px"}
          display={{ md: "none" }}
        />
      </Flex>
      <SearchInput />
      <RightContent />
    </Flex>
  );
}
