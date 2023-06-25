import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {};

export default function SearchInput({}: SearchInputProps) {
  return (
    // Flex grow - take up the remaining width of it's parent container
    <Flex flexGrow={1} mr={2} ml={2} align={"center"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Feddit"
          fontSize={"14pt"}
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height={"38px"}
          bg={"gray.50"}
          borderColor={"gray.400"}
        />
      </InputGroup>
    </Flex>
  );
}
