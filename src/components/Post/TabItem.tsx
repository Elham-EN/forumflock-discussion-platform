import React, { ReactElement } from "react";
import { FormTabsType } from "./NewPostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";

interface TabItemProps {
  item: FormTabsType;
  selected: boolean;
  setSelectedTab: (value: string) => void;
}

function TabItem({
  item,
  selected,
  setSelectedTab,
}: TabItemProps): ReactElement {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      flexGrow={1}
      p={"14px 0"}
      cursor={"pointer"}
      _hover={{ bg: "gray.100", color: "brand.100" }}
      color={selected ? "brand.100" : "gray.600"}
      borderWidth={selected ? "2px" : "1px"}
      borderBottomColor={selected ? "brand.100" : "gray.200"}
      borderRightColor={"gray.200"}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align={"center"} height={"28px"}>
        <Icon as={item.icon} boxSize={"30px"} />
      </Flex>
      <Text fontSize={"16pt"} fontWeight={500}>
        {item.title}
      </Text>
    </Flex>
  );
}

export default TabItem;
