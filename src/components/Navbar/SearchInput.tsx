import { firestore } from "@/firebase/clientApp";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiFace } from "react-icons/bi";

interface SearchResults {
  communityId: string;
  imageURL: string;
}

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>();

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    const fetchCommunities = async () => {
      const communityCollection = collection(firestore, "communities");
      const communityQuery = query(
        communityCollection,
        where("__name__", ">=", searchTerm),
        where("__name__", "<", searchTerm + "\uf8ff")
      );
      const querySnapshot = await getDocs(communityQuery);
      const communities = querySnapshot.docs.map(
        (doc) =>
          ({
            communityId: doc.id,
            imageURL: doc.data().imageURL,
          } as SearchResults)
      );
      console.log(communities);

      setSearchResults(communities);
    };

    fetchCommunities();
  }, [searchTerm]);
  return (
    <Flex flexGrow={1} mr={2} ml={2} align={"center"} position="relative">
      <InputGroup>
        <InputLeftElement mt={1} pointerEvents="none">
          <SearchIcon color="gray.400" fontSize={24} />
        </InputLeftElement>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Find community to join"
          fontSize={"14pt"}
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
            transition: "all 0.3s",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
            boxShadow: "0 0 0 2px rgba(45, 55, 72, 0.2)", // soft shadow for focus
            transition: "all 0.3s",
          }}
          height={"48px"}
          bg={"gray.200"}
          borderColor={"gray.400"}
          borderRadius="full" // full border-radius
        />
      </InputGroup>
      {searchResults && searchResults?.length > 0 && (
        <Box
          position="absolute"
          top="50px"
          left="0"
          right="0"
          mt={2}
          border="1px solid gray"
          bg="white"
          boxShadow="md"
          zIndex="1"
        >
          <List spacing={1}>
            {searchResults &&
              searchResults.map((community, index) => (
                <ListItem
                  key={index}
                  p={5}
                  borderBottom={"1px solid"}
                  borderColor={"gray.300"}
                  display="flex"
                  alignItems="center"
                  cursor={"pointer"}
                  _hover={{
                    bg: "gray.100",
                    transition: "background-color 0.3s",
                  }}
                >
                  <Link
                    href={`/f/${community.communityId}`}
                    onClick={() => setSearchTerm("")}
                  >
                    <Box mr={2}>
                      {community.imageURL ? (
                        <Image
                          src={community.imageURL}
                          alt={""}
                          width="30px"
                          height="30px"
                          borderRadius="full"
                          ml={1}
                        />
                      ) : (
                        <Icon mt={1} as={BiFace} boxSize={"9"} />
                      )}
                    </Box>
                    {community.communityId}
                  </Link>
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Flex>
  );
}
