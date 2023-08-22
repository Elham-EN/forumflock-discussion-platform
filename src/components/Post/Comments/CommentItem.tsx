import { auth } from "@/firebase/clientApp";
import {
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { ReactElement } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  const [user] = useAuthState(auth);
  const toast = useToast({
    title: "Functionality Coming Soon.",
    description: "Currently, this functionality is not available",
    status: "success",
    duration: 9000,
    isClosable: true,
    containerStyle: {
      width: "600px",
    },
  });
  return (
    <Flex
      mt={1}
      border={"1px solid"}
      p={3}
      borderColor={"gray.500"}
      borderRadius={"16px"}
    >
      <Box mr={2}>
        <Icon boxSize={10} as={BiFace} />
      </Box>
      <Stack spacing={1} mt={0.5}>
        <Stack direction={"row"} align={"center"} fontSize={"12pt"}>
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color={"gray.600"}>
            {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size={"sm"} />}
        </Stack>
        <Text fontSize={"14pt"}>{comment.text}</Text>
        <Stack direction={"row"} cursor={"pointer"} color={"gray.500"}>
          {/* <Icon as={BsHandThumbsUp} boxSize={6} onClick={() => toast()} />
          <Text fontSize={"14pt"} color={"brand.100"}>
            25
          </Text>
          <Icon as={BsHandThumbsDown} boxSize={6} onClick={() => toast()} />
          <Text fontSize={"14pt"} color={"red.600"}>
            5
          </Text> */}

          {/* {user?.uid && (
            <Stack>
              <Text
                fontWeight={700}
                fontSize={"14pt"}
                _hover={{ color: "gray.800" }}
                cursor={"pointer"}
                onClick={() => toast()}
              >
                Reply
              </Text>
            </Stack>
          )} */}

          <Stack direction={"row"} ml={0}>
            {userId === comment.creatorId && (
              <>
                {/* <Text
                  fontWeight={700}
                  fontSize={"14pt"}
                  _hover={{ color: "gray.800" }}
                  onClick={() => toast()}
                >
                  Edit
                </Text> */}
                <Text
                  fontWeight={700}
                  fontSize={"14pt"}
                  _hover={{ color: "brand.100" }}
                  onClick={() => onDeleteComment(comment)}
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
