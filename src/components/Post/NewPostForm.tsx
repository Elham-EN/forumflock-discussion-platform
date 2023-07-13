import { Flex } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { BsLink } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { IconType } from "react-icons";
import TabItem from "./TabItem";

export interface FormTabsType {
  title: string;
  icon: IconType;
}

// Created multi-tap navigation (static Array)
const formTabs: FormTabsType[] = [
  {
    title: "Post",
    icon: IoCreate,
  },
  {
    title: "Images & Video",
    icon: GoFileMedia,
  },
  {
    title: "Link",
    icon: BsLink,
  },
  {
    title: "Poll",
    icon: MdOutlinePoll,
  },
];

export default function NewPostForm(): ReactElement {
  // Track which tab item is currently selected
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
      <Flex width={"100%"}>
        {/** selected prop is a boolean type that represent if this particular tab
         * item is currently selected one. True if this tab is selected
         */}
        {formTabs.map((item) => (
          <TabItem
            item={item}
            key={item.title}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
    </Flex>
  );
}
