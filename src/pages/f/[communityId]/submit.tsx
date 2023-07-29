import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { MdCreate } from "react-icons/md";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";

export default function Submit(): ReactElement {
  const router = useRouter();
  // Get Current Logged IN / Authenticated user's information
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);

  return (
    <PageContent>
      <>
        <Box
          display={"flex"}
          alignItems={"flex-end"}
          fontSize={"24px"}
          borderBottom={"1px solid"}
          borderBottomColor={"white"}
          p={"5px 0px 5px 5px"}
          gap={2}
          height={"180px"}
        >
          <Icon as={MdCreate} mb={2} />
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
        {user && (
          <NewPostForm
            user={user}
            communityId={router.query.communityId as string}
          />
        )}
      </>
      <>
        <div>About community</div>
      </>
    </PageContent>
  );
}
