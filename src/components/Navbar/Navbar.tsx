import React from "react";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import Directory from "./Directory/Directory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { BiFace } from "react-icons/bi";
import Link from "next/link";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";

export default function Navbar(): React.ReactElement {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg={"white"}
      height={"70px"}
      padding={"6px 3px"}
      position={"fixed"}
      width={"100%"}
      zIndex={500}
    >
      <Flex align={"center"} my={2}>
        <Flex
          mx={{ base: 0, md: 5 }}
          align={"center"}
          onClick={() => onSelectMenuItem(defaultMenuItem)}
          cursor={"pointer"}
        >
          <Icon
            color={"brand.100"}
            as={BiFace}
            boxSize={{ base: 10, sm: "16" }}
          />
          <Text
            display={{ base: "none", md: "unset" }}
            fontWeight={"700"}
            fontFamily={"monospace"}
            fontSize={"14pt"}
          >
            ForumFlock
          </Text>
        </Flex>
      </Flex>
      <Directory />
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
}
