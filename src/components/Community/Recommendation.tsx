import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { BiFace } from "react-icons/bi";

export default function Recommendation(): ReactElement {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendation = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
      setLoading(false);
    } catch (error) {
      console.log("getCommunitiesRecommendation error", error);
    }
  };

  useEffect(() => {
    getCommunityRecommendation();
  }, []);

  return (
    <Box
      flexDirection={"column"}
      position={"sticky"}
      top={36}
      maxWidth={"400px"}
      bg={"white"}
      borderRadius={"15px"}
      border={"1px solid"}
      borderColor={"gray.400"}
      shadow={"2xl"}
    >
      <Flex
        w={"full"}
        align={"flex-end"}
        justify={"center"}
        color={"white"}
        bg={"brand.100"}
        p={"10px 25px"}
        fontWeight={"700"}
        fontSize={"16pt"}
        borderTopRightRadius={"15px"}
        borderTopLeftRadius={"15px"}
      >
        <Text>Top Communities of Today</Text>
      </Flex>
      <Flex direction={"column"}>
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify={"space-between"} align={"center"}>
              <SkeletonCircle size="10" />
              <Skeleton height={"10px"} width={"70%"} />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <SkeletonCircle size="10" />
              <Skeleton height={"10px"} width={"70%"} />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <SkeletonCircle size="10" />
              <Skeleton height={"10px"} width={"70%"} />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              // if the user is in this community
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/f/${item.id}`}>
                  <Flex
                    align={"center"}
                    fontSize={"14pt"}
                    borderBottom={"1px solid"}
                    borderColor={"gray.300"}
                    p={"10px 12px"}
                    _hover={{
                      bg: "gray.100",
                    }}
                  >
                    <Flex width={"80%"} align={"center"}>
                      <Flex width={"15%"}>
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align={"center"} width={"80%"}>
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            borderRadius={"full"}
                            boxSize={"36px"}
                            alt=""
                            mr={3}
                          />
                        ) : (
                          <Icon
                            as={BiFace}
                            fontSize={36}
                            color={"brand.100"}
                            mr={3}
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {`f/${item.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box>
                      <Button
                        width={"100px"}
                        fontSize={"10pt"}
                        variant={isJoined ? "outline" : "solid"}
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(item, isJoined);
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
          </>
        )}
      </Flex>
      <Flex direction={"column"} p={"10px"}>
        <Text fontSize={"16pt"} fontWeight={700}>
          Home
        </Text>
        <Text fontSize={"14pt"}>
          Your personal ForumFlock homepage. Come here to check in with your
          favorite communities.
        </Text>
      </Flex>
    </Box>
  );
}
