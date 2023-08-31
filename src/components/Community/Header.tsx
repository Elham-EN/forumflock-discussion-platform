import React, { ReactElement } from "react";
import { Community } from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BiFace } from "react-icons/bi";

interface HeaderProps {
  communityData: Community;
}

function Header({ communityData }: HeaderProps): ReactElement {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  // read from our communitySnippet, since my snippets is a array, that represent
  // the communities that the user is currently in. We can search throught the array
  // and try to find the snippet where the id matches the id of community data. If
  // found, this mean that this user has indeed joined this community
  const isJoined = !!communityStateValue.mySnippets.find(
    // if communitySnippets's id equals community'id, it return that snippet otherwise
    // return undefine if not found. !! - cast to boolean value type
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex direction={"column"} width={"100%"} height={"150px"}>
      <Box height={"30%"} bgGradient="linear(to-r, brand.100, brand.200)" />
      <Flex bg={"white"} justify={"center"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"1460px"} align={"center"} gap={1}>
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity.imageURL}
              alt="community avatar"
              boxSize={"100px"}
              borderRadius={"full"}
              border="4px solid"
              borderColor={"white"}
            />
          ) : (
            <Icon
              as={BiFace}
              fontSize={100}
              position="relative"
              top={-3}
              color="brand.100"
              border="4px solid"
              borderColor={"white"}
              bg={"gray.100"}
              borderRadius="50%"
            />
          )}
          <Flex
            padding={"5px 16px"}
            my={3}
            flexDirection={{ base: "column", md: "row" }}
            justify={"space-between"}
            w={"full"}
          >
            <Flex flexDirection={"column"} mr={"30px"}>
              <Text
                fontSize={{ base: "16pt", md: "24pt" }}
                fontWeight={700}
                wordBreak={"break-all"}
              >
                {communityData.id}
              </Text>
              <Text fontWeight={700} color={"gray.500"} fontSize={"12pt"}>
                f/{communityData.id}
              </Text>
            </Flex>

            <Flex gap={0} mt={2} mr={"30px"}>
              <Button
                w={"100%"}
                variant={"outline"}
                size={"md"}
                px={10}
                paddingTop={1}
                fontWeight={600}
                fontSize={"16pt"}
                fontFamily={"sans-serif"}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
