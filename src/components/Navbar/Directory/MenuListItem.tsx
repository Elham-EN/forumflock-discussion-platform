import { Flex, MenuItem, Image, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IconType } from "react-icons";

interface MenuListItemProps {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageUrl?: string;
}

export default function MenuListItem({
  displayText,
  link,
  icon,
  iconColor,
  imageUrl,
}: MenuListItemProps): ReactElement {
  return (
    <MenuItem
      width={"100%"}
      fontSize={"12pt"}
      _hover={{
        bg: "gray.200",
      }}
      onClick={() => {}}
    >
      <Flex align={"center"}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="image"
            borderRadius={"full"}
            boxSize={"22px"}
            mr={2}
          />
        ) : (
          <Icon as={icon} fontSize={25} mr={2} color={iconColor} />
        )}
        <Text>{displayText}</Text>
      </Flex>
    </MenuItem>
  );
}
