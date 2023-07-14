import { Flex, layout } from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { BsLink } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { IconType } from "react-icons";
import TabItem from "./TabItem";
import TextInput from "./PostForm/TextInput";

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

interface TextInputType {
  title: string;
  body: string;
}

export default function NewPostForm(): ReactElement {
  // Track which tab item is currently selected
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  const [textInputs, setTextInputs] = useState<TextInputType>({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreatePost = async () => {};

  const onSelectImage = () => {};

  const onTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <Flex p={5}>
        {/** Display content based on the tab clicked */}
        {selectedTab === "Post" && (
          <TextInput
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
      </Flex>
    </Flex>
  );
}
