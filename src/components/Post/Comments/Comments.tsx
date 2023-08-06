import { Post } from "@/atoms/postsAtom";
import { Box, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { ReactElement, useEffect, useState } from "react";
import CommentInput from "./CommentInput";

interface CommentsProps {
  user: User;
  selectedPost: Post | null;
  communityId: string;
}
function Comments({
  user,
  selectedPost,
  communityId,
}: CommentsProps): ReactElement {
  const [commentText, setCommentText] = useState<string>("");
  // represent all of the comments for this post coming from DB
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const onCreateComment = async (commentText: string) => {};
  const onDeleteComment = async (comment: any) => {};
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg={"white"} borderRadius={"0px 0px 5px 5px"} p={3}>
      <Flex
        direction={"column"}
        pl={10}
        pr={4}
        mb={6}
        fontSize={"14pt"}
        width={"100%"}
      >
        {/** CommentInput */}
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
}

export default Comments;
