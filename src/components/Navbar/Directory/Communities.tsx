import React, { ReactElement, useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Box, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { BiFace } from "react-icons/bi";

export default function Communities(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"12pt"}
          fontWeight={600}
          color={"gray.500"}
        >
          Moderating
        </Text>

        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              displayText={snippet.communityId}
              link={`/f/${snippet.communityId}`}
              icon={BiFace}
              iconColor={"red"}
              imageUrl={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"12pt"}
          fontWeight={600}
          color={"gray.500"}
        >
          My Communities
        </Text>

        <MenuItem
          width={"100%"}
          fontSize={"11pt"}
          onClick={() => setOpen(true)}
        >
          <Flex>
            <Icon fontSize={24} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            displayText={snippet.communityId}
            link={`/f/${snippet.communityId}`}
            icon={BiFace}
            iconColor={"red"}
            imageUrl={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
}
