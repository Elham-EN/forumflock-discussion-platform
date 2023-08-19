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
      bg="white"
      height="60px"
      padding="6px 10px"
      justify={{ md: "space-between" }}
      position="sticky"
      top="4px"
      zIndex="999"
      // Rounded props
      border="1px solid"
      borderColor="gray.300"
      borderRadius={10}
      m={{ base: 1, md: 1.5 }}
      shadow="lg"
    >
      <Flex align={"center"} my={2}>
        <Flex
          align={"center"}
          onClick={() => onSelectMenuItem(defaultMenuItem)}
          cursor={"pointer"}
        >
          <Icon
            color={"brand.100"}
            as={BiFace}
            boxSize={{ base: 10, sm: "14" }}
          />
          <Text
            display={{ base: "none", md: "unset" }}
            fontWeight={"700"}
            fontFamily={"monospace"}
            fontSize={"24pt"}
          >
            ForumFlock
          </Text>
        </Flex>
      </Flex>
      {user?.uid && <Directory />}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
}
