import { Community } from "@/atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiCircle } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

interface AboutProps {
  communityData: Community;
}

function About({ communityData }: AboutProps): ReactElement {
  const router = useRouter();
  return (
    <Box position={"sticky"} top={20}>
      <Flex
        bg={"brand.200"}
        color={"white"}
        align={"center"}
        justify={"space-between"}
        p={5}
        borderRadius={"5px 5px 0px 0px"}
      >
        <Text fontSize={"14pt"} fontWeight={700}>
          About Community
        </Text>
        <Icon
          fontSize={"18pt"}
          as={HiOutlineDotsHorizontal}
          cursor={"pointer"}
        />
      </Flex>
      <Flex
        direction={"column"}
        p={3}
        bg={"white"}
        borderRadius={"0px 0px 5px 5px"}
      >
        <Stack>
          <Flex
            width={"100%"}
            p={2}
            fontSize={"14pt"}
            fontWeight={700}
            gap={10}
          >
            <Flex direction={"column"}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text fontWeight={500}>Members</Text>
            </Flex>
            <Flex direction={"column"}>
              <Flex align={"center"} gap={2}>
                <Icon color={"green.300"} fill={"green.300"} as={FiCircle} />
                <Text>2</Text>
              </Flex>
              <Text fontWeight={500}>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align={"center"}
            width={"100%"}
            p={1}
            fontWeight={500}
            gap={3}
            mb={2}
            mt={2}
          >
            <Icon as={FaBirthdayCake} fontSize={"24px"} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Divider />
          <Link href={`/f/${router.query.communityId}/submit`}>
            <Button mb={2} mt={2} width={"100%"}>
              Create Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

export default About;
