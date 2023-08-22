/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Box, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { BiFace } from "react-icons/bi";
import useCommunityData from "@/hooks/useCommunityData";
import { useRouter } from "next/router";

export default function Communities(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  const { getMySnippets } = useCommunityData();
  const router = useRouter();

  // Update Recoil Global State based on Navigating to different page
  useEffect(() => {
    const handleRouteChange = async () => {
      await getMySnippets();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

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
              imageURL={snippet.imageURL}
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
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
}
