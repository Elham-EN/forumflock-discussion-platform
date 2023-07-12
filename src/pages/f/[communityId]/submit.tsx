import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box, Divider, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { MdCreate } from "react-icons/md";

export default function Submit(): ReactElement {
  return (
    <PageContent>
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          //   justifyContent={"center"}
          fontSize={"24px"}
          gap={2}
          p={5}
          borderBottom={"1px solid"}
          borderBottomColor={"white"}
        >
          <Icon as={MdCreate} />
          <Text fontSize={"18pt"} fontWeight={700} fontFamily={"sans-serif"}>
            Create a post
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
