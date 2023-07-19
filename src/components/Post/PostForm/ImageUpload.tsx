import React, { ChangeEvent, ReactElement, useRef } from "react";
import { Button, Flex, Image, Stack } from "@chakra-ui/react";

interface ImageUploadProps {
  selectedFile?: string;
  onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
}

export default function ImageUpload(props: ImageUploadProps): ReactElement {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex
      flexDirection={"column"}
      justify={"center"}
      align={"center"}
      width={"100%"}
    >
      {props.selectedFile ? (
        <>
          <Image
            src={props.selectedFile}
            alt="image"
            maxWidth={"400px"}
            maxHeight={"400pxs"}
          />
          <Stack direction={"row"} mt={5}>
            <Button
              fontSize={"14pt"}
              size={"lg"}
              borderRadius={"50px"}
              onClick={() => props.setSelectedTab("Post")}
            >
              Back to Post
            </Button>
            <Button
              variant={"outline"}
              fontSize={"14pt"}
              size={"lg"}
              borderRadius={"50px"}
              onClick={() => props.setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify={"center"}
          p={20}
          border={"1px dashed"}
          width={"100%"}
          borderRadius={"5px"}
        >
          <Button
            fontSize={"14pt"}
            size={"lg"}
            borderRadius={"50px"}
            variant={"outline"}
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={props.onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
}
