import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

export default function Directory(): ReactElement {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={5}
        mr={2}
        ml={2}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          width={{ base: "none", md: "50px", lg: "270px" }}
        >
          <Flex align={"center"}>
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt=""
                borderRadius={"full"}
                boxSize={"24px"}
                mr={1}
              />
            ) : (
              <>
                <Icon
                  fontSize={30}
                  as={directoryState.selectedMenuItem.icon}
                  color={directoryState.selectedMenuItem.iconColor}
                  mr={{ base: 1, md: 2 }}
                />
              </>
            )}

            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize={"12pt"}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon fontSize={28} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
}
