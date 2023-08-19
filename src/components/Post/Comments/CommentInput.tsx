import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Flex, Text, Textarea, position } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { ReactElement } from "react";

interface CommentInputProps {
  commentText: string; // state variable
  setCommentText: (value: string) => void; // state update function
  user: User;
  createLoading: boolean; // state variable
  onCreateComment: () => void;
}

function CommentInput({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}: CommentInputProps): ReactElement {
  return (
    <Flex direction={"column"} position={"relative"}>
      {user ? (
        <>
          <Flex gap={2}>
            <Text mb={1}>Comment as</Text>
            <Text fontWeight={700} color={"brand.100"}>
              {user.email?.split("@")[0]}
            </Text>
          </Flex>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize={"14pt"}
            minHeight={"160px"}
            borderRadius={5}
            pb={10}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          />
          <Flex
            justify={"flex-end"}
            height={"50px"}
            align={"center"}
            bg={"gray.100"}
            p={"6px 18px"}
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height={"36px"}
              minWidth={"200px"}
              fontSize={"14pt"}
              disabled={commentText.length === 0}
              isLoading={createLoading}
              onClick={onCreateComment}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"space-between"}
          border={"1px solid"}
          borderColor={"gray.300"}
          borderRadius={5}
          p={5}
          gap={10}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons displayType="flex" />
        </Flex>
      )}
    </Flex>
  );
}

export default CommentInput;
