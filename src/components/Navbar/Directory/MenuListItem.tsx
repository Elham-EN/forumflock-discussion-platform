import useDirectory from "@/hooks/useDirectory";
import { Flex, MenuItem, Image, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IconType } from "react-icons";

interface MenuListItemProps {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}

export default function MenuListItem({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}: MenuListItemProps): ReactElement {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width={"100%"}
      fontSize={"12pt"}
      _hover={{
        bg: "gray.200",
      }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex align={"center"}>
        {imageURL ? (
          <Image
            src={imageURL}
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
