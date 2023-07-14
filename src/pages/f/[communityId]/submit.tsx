import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { MdCreate } from "react-icons/md";
import { useRouter } from "next/router";

export default function Submit(): ReactElement {
  const router = useRouter();
  console.log(router.query.communityId);

  return (
    <PageContent>
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          fontSize={"24px"}
          borderBottom={"1px solid"}
          borderBottomColor={"white"}
          p={"5px 0px 5px 5px"}
          gap={2}
        >
          <Icon as={MdCreate} />
          <Text fontSize={"18pt"} fontWeight={700} fontFamily={"sans-serif"}>
            Create a post for your{" "}
            <span
              style={{
                color: "red",
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                fontSize: "16pt",
              }}
            >
              {router.query.communityId}
            </span>{" "}
            community
          </Text>
        </Box>
        <NewPostForm />
      </>
      <>
        <div>About community</div>
      </>
    </PageContent>
  );
}
