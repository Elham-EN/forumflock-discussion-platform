import { Flex, Stack, Textarea, Text, Spinner } from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement } from "react";

interface DescriptionInputProps {
  displayTextArea: string;
  aboutDescription: string;
  characterSize: number;
  loading: boolean;
  saveDescriptionToDB: () => Promise<void>;
  onCancelInput: () => void;
  handleChangeInput: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function DescriptionInput({
  displayTextArea,
  aboutDescription,
  characterSize,
  loading,
  saveDescriptionToDB,
  onCancelInput,
  handleChangeInput,
}: DescriptionInputProps): ReactElement {
  return (
    <Flex direction={"column"} display={displayTextArea}>
      <Textarea
        placeholder="Tell us what your community is about?"
        _placeholder={{ color: "gray.800" }}
        bg={"gray.100"}
        minHeight={"150px"}
        onChange={handleChangeInput}
        value={aboutDescription}
      />
      <Flex justify={"space-between"}>
        <Stack>
          <Text color={characterSize === 0 ? "red.500" : "black"}>
            {characterSize} characters remaining
          </Text>
        </Stack>
        <Stack direction={"row"} gap={5}>
          {loading ? (
            <Spinner />
          ) : (
            <Text
              color={"brand.100"}
              fontWeight={700}
              cursor={"pointer"}
              onClick={saveDescriptionToDB}
            >
              Save
            </Text>
          )}
          <Text
            color={"red.500"}
            fontWeight={700}
            cursor={"pointer"}
            onClick={onCancelInput}
          >
            Cancel
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
