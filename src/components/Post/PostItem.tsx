import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FirestoreError } from "firebase/firestore";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import {
  BsShare,
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsBookmark,
} from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";

interface PostItemProps {
  post: Post;
  // represent if the currently logged in user actually
  // created  this post and is the owner then they can do
  // certian things like delete the post
  userIsCreator: boolean;
  // the current user vote value on this post
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
}

function PostItem(props: PostItemProps): ReactElement {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const { post, onDeletePost } = props;
      // Delete post and return true
      const success = await onDeletePost(post);
      // if fail to delete post, throw an exception
      if (!success) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      const errorMsg = error as FirestoreError;
      setError(errorMsg.message);
    }
    setLoadingDelete(false);
  };
  return (
    <Flex
      border={"1px solid"}
      bg={"white"}
      borderColor={"gray.300"}
      borderRadius={5}
      _hover={{ borderColor: "gray.500" }}
      cursor={"pointer"}
      onClick={props.onSelectPost}
    >
      <Flex
        direction={"column"}
        align={"center"}
        bg={"gray.100"}
        p={2}
        width={"40px"}
        borderRadius={5}
      >
        <Icon
          as={BsHandThumbsUp}
          color={props.userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={props.onVote}
          cursor={"pointer"}
        />
        <Text>{props.post.voteStatus}</Text>
        <Icon
          as={BsHandThumbsDown}
          color={props.userVoteValue === -1 ? "red.600" : "gray.400"}
          fontSize={22}
          onClick={props.onVote}
          cursor={"pointer"}
        />
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {error && (
          <Alert status={"error"}>
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p={"10px"}>
          <Stack direction={"row"} spacing={3}>
            {/** Display Community'image only in the homepage not coummunity*/}
            <Text color={"gray.500"}>
              Posted by u/{props.post.creatorDisplayName}
            </Text>
            <Text color={"gray.500"}>
              {moment(new Date(props.post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"16pt"} fontWeight={600}>
            {props.post.title}
          </Text>
          <Text fontSize={"13pt"} mb={3} p={3}>
            {props.post.body}
          </Text>
          {props.post.imageURL && (
            <Flex justify={"center"}>
              {loadingImage && (
                <Skeleton height={"200px"} width={"100%"} borderRadius={5} />
              )}
              <Image
                src={props.post.imageURL}
                alt="post image content"
                maxHeight={"460px"}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={1} color={"gray.500"} fontWeight={600}>
          <Flex
            align={"center"}
            p={"8px 10px"}
            borderRadius={5}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={GoComment} boxSize={{ base: "5", md: "7" }} />
            <Text
              mb={{ base: 1, md: 2 }}
              ml={1}
              fontSize={{ base: "10pt", md: "14" }}
            >
              {props.post.numberOfComments}{" "}
              {props.post.numberOfComments <= 1 ? "comment" : "comments"}{" "}
            </Text>
          </Flex>
          <Flex
            align={"center"}
            p={"8px 10px"}
            borderRadius={5}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={BsShare} boxSize={{ base: "5", md: "7" }} />
            <Text
              mb={{ base: 0, md: 0 }}
              ml={1}
              fontSize={{ base: "10pt", md: "14" }}
            >
              Share
            </Text>
          </Flex>
          <Flex
            align={"center"}
            p={"8px 10px"}
            borderRadius={5}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={BsBookmark} boxSize={{ base: "5", md: "7" }} />
            <Text
              mb={{ base: 0, md: 0 }}
              ml={1}
              fontSize={{ base: "10pt", md: "14" }}
            >
              Bookmark
            </Text>
          </Flex>
          {props.userIsCreator && (
            <Flex
              align={"center"}
              justify={"center"}
              flexGrow={1}
              mr={1}
              p={"8px 10px"}
              borderRadius={5}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size={"sm"} />
              ) : (
                <Icon as={RiDeleteBinLine} boxSize={{ base: "5", md: "7" }} />
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostItem;