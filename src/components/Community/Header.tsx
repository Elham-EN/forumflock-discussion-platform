import React, { ReactElement } from "react";
import { Community } from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import { Avatar, Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BsBellFill } from "react-icons/bs";

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
    <Flex direction={"column"} width={"100%"} height={"186px"}>
      <Box height={"50%"} bgGradient="linear(to-r, brand.100, #ca8aff)" />
      <Flex bg={"white"} justify={"center"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"1460px"} gap={1}>
          {communityData.imageURL ? (
            <Image src={communityData.imageURL} alt="community avatar" />
          ) : (
            <Avatar
              position={"relative"}
              top={{ base: "10px", md: "-35px" }}
              src="https://bit.ly/tioluwani-kolawole"
              size={"xl"}
              border={"5px solid white"}
            />
          )}
          <Flex
            padding={"5px 16px"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex flexDirection={"column"} mr={"30px"}>
              <Text fontSize={"24pt"} fontWeight={700} wordBreak={"break-all"}>
                {communityData.id}
              </Text>
              <Text fontWeight={700} color={"gray.500"} fontSize={"12pt"}>
                f/{communityData.id}
              </Text>
            </Flex>

            <Flex gap={5} alignSelf={"flex-start"} mt={2}>
              <Button
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
              {isJoined ? (
                <Icon
                  as={BsBellFill}
                  boxSize={10}
                  color={"brand.200"}
                  border={"2px solid"}
                  borderRadius={"50%"}
                  padding={1.5}
                  _hover={{
                    bg: "brand.100",
                    color: "white",
                  }}
                />
              ) : (
                ""
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
