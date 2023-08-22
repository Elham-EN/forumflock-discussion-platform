import React, { ReactElement } from "react";
import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsBell, BsPlusLg } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";

export default function Icons(): ReactElement {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align={"center"}
        justify={"center"}
      >
        <Flex
          mx={2.5}
          cursor={"pointer"}
          padding={1}
          borderRadius={5}
          _hover={{ bg: "gray.200" }}
        >
          <Tooltip label="Popular Posts" fontWeight={"bold"}>
            <span>
              <Icon as={BsArrowUpRightCircle} boxSize={"7"} />
            </span>
          </Tooltip>
        </Flex>
        <Flex
          mx={2.5}
          cursor={"pointer"}
          padding={1}
          borderRadius={5}
          _hover={{ bg: "gray.200" }}
        >
          <Tooltip label="Message" fontWeight={"bold"}>
            <span>
              <Icon as={BiMessageRounded} boxSize={"7"} />
            </span>
          </Tooltip>
        </Flex>
      </Flex>
      <>
        <Flex
          mx={2.5}
          cursor={"pointer"}
          padding={1}
          borderRadius={5}
          _hover={{ bg: "gray.200" }}
        >
          <Tooltip label="Notification" fontWeight={"bold"}>
            <span>
              <Icon as={BsBell} boxSize={"7"} />
            </span>
          </Tooltip>
        </Flex>
        {/* <Flex
          mx={2.5}
          cursor={"pointer"}
          padding={1}
          borderRadius={5}
          _hover={{ bg: "gray.200" }}
        >
          <Tooltip label="Create Post" fontWeight={"bold"}>
            <span>
              <Icon as={BsPlusLg} boxSize={"7"} />
            </span>
          </Tooltip>
        </Flex> */}
      </>
    </Flex>
  );
}
