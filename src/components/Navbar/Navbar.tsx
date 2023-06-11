import React from "react";
import { Flex, Image } from "@chakra-ui/react";

export default function Navbar(): React.ReactElement {
  return (
    <Flex bg={"white"} height={"70px"} padding={"6px 12px"}>
      <Flex align={"center"}>
        <Image
          src="/images/fedditLogo1.png"
          alt="Feddit Logo"
          height={"60px"}
        />
      </Flex>
    </Flex>
  );
}
