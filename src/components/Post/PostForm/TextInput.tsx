import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement, useState } from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

export default function TextInput({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}: TextInputsProps): ReactElement {
  return (
    <Stack spacing={3} width={"100%"}>
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        bg={"white"}
        variant={"outline"}
        fontSize={"14pt"}
        placeholder="You topic title"
      />

      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        height={"250px"}
        fontSize={"14pt"}
        placeholder="Your topic's content"
      />
      <Flex mt={1} width={"100%"}>
        <Button
          fontSize={"14pt"}
          w={"full"}
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post to your community
        </Button>
      </Flex>
    </Stack>
  );
}
