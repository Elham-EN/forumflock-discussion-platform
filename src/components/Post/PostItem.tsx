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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { BiFace } from "react-icons/bi";
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
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
}

function PostItem(props: PostItemProps): ReactElement {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // if there is no !onSelectPost, then it's true we're on single post page
  const singlePostPage = !props.onSelectPost;
  const router = useRouter();

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const { post, onDeletePost } = props;
      // Delete post and return true
      const success = await onDeletePost(post);
      // if fail to delete post, throw an exception
      if (!success) {
        throw new Error("Failed to delete post");
      }
      if (singlePostPage) {
        router.push(`f/${post.communityId}`);
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
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={15}
      _hover={{ borderColor: singlePostPage ? "none" : "brand.100" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => props.onSelectPost && props.onSelectPost(props.post)}
      boxShadow="xl"
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify={singlePostPage ? "none" : "center"}
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        mt={singlePostPage ? 2.5 : "0"}
        width={"40px"}
        borderLeftRadius={15}
      >
        <Icon
          as={BsHandThumbsUp}
          color={props.userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) =>
            props.onVote(event, props.post, 1, props.post.communityId)
          }
          cursor={"pointer"}
          _hover={{ color: "brand.100" }}
        />
        <Text>{props.post.voteStatus}</Text>
        <Icon
          as={BsHandThumbsDown}
          color={props.userVoteValue === -1 ? "red.600" : "gray.400"}
          fontSize={22}
          onClick={(event) =>
            props.onVote(event, props.post, -1, props.post.communityId)
          }
          cursor={"pointer"}
          _hover={{ color: "red.600" }}
        />
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {error && (
          <Alert status={"error"}>
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p={"10px"} direction={{ base: "column", lg: "row" }}>
          {/** Display Community'image only in the homepage not coummunity*/}
          {props.homePage && (
            <Flex gap={3}>
              {props.post.communityImageURL ? (
                <Image
                  src={props.post.communityImageURL}
                  alt=""
                  borderRadius={"full"}
                  boxSize={"20pt"}
                />
              ) : (
                <Icon as={BiFace} fontSize={"20pt"} color={"brand.100"} />
              )}
              <Link href={`f/${props.post.communityId}`}>
                <Text
                  color={"brand.100"}
                  fontWeight={600}
                  onClick={(event) => event.stopPropagation()}
                >
                  {props.post.communityId}
                </Text>
              </Link>
            </Flex>
          )}
          <Flex>
            <Text color={"gray.500"}>
              Posted by u/{props.post.creatorDisplayName}
            </Text>
            <Text color={"gray.500"}>
              {moment(new Date(props.post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Flex>
        </Stack>
        <Text fontSize={"16pt"} fontWeight={600} px={3}>
          {props.post.title}
        </Text>
        <Text fontSize={"13pt"} mb={1} p={3}>
          {props.post.body}
        </Text>
        {props.post.imageURL && (
          <Flex justify={"center"} align={"center"}>
            {loadingImage && (
              <Skeleton height={"200px"} width={"100%"} borderRadius={5} />
            )}
            <Image
              src={props.post.imageURL}
              alt="Image for post"
              maxHeight="450px"
              maxWidth="100%"
              borderRadius="16px"
              display={loadingImage ? "none" : "unset"}
              onLoad={() => setLoadingImage(false)}
              px={2}
            />
          </Flex>
        )}

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
              mb={{ base: 0, md: 0 }}
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
              onClick={(event) => handleDelete(event)}
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
