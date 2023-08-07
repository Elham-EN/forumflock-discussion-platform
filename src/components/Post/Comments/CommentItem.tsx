import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { ReactElement } from "react";
import { BiFace } from "react-icons/bi";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

export interface Comment {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
}

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  // check if the creator of this comment is the current user
  userId: string;
}

export default function CommentItem({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}: CommentItemProps): ReactElement {
  return (
    <Flex mt={1}>
      <Box mr={2}>
        <Icon boxSize={10} as={BiFace} />
      </Box>
      <Stack spacing={1} mt={0.5}>
        <Stack direction={"row"} align={"center"} fontSize={"12pt"}>
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color={"gray.600"}>
            {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
        <Text fontSize={"14pt"}>{comment.text}</Text>
        <Stack direction={"row"} cursor={"pointer"} color={"gray.500"}>
          <Icon as={BsHandThumbsUp} boxSize={6} />
          <Text fontSize={"14pt"} color={"brand.100"}>
            25
          </Text>
          <Icon as={BsHandThumbsDown} boxSize={6} />
          <Text fontSize={"14pt"} color={"red.600"}>
            5
          </Text>
          <Stack direction={"row"} ml={3}>
            {userId === comment.creatorId && (
              <>
                <Text
                  fontWeight={700}
                  fontSize={"14pt"}
                  _hover={{ color: "brand.100" }}
                >
                  Edit
                </Text>
                <Text
                  fontWeight={700}
                  fontSize={"14pt"}
                  _hover={{ color: "brand.100" }}
                >
                  Delete
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}
