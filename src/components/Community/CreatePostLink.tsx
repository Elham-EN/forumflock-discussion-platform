import React, { ReactElement } from "react";
import { Flex, Icon, Image, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { IoImageOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";

export default function CreatePostLink(): ReactElement {
  // create routes from dynamic data, A Dynamic Segment can be
  // created by wrapping a folder's name in square brackets:
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onClick = () => {
    // if user is not authenticated
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    router.push(`/f/${communityId}/submit`);
  };

  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      bg={"white"}
      height={"76px"}
      borderRadius={5}
      border={"1px solid"}
      borderColor={"gray.300"}
      p={2}
      mb={4}
    >
      <Image
        src="/images/fedditLogoNoText1.png"
        width={"50px"}
        alt="brand logo"
      />
      <Input
        bg={"gray.200"}
        placeholder="Create Post"
        fontSize={"12pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
}
