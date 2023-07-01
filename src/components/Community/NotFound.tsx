import { ReactElement } from "react";
import Link from "next/link";
import { Button, Flex, Text } from "@chakra-ui/react";

export default function CommunityNotFound(): ReactElement {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"60vh"}
    >
      <Text fontSize={"14pt"}>
        Sorry that community does not exist or has been banned
      </Text>
      <Link href={"/"}>
        <Button size={"lg"} fontSize={"14pt"} mt={5}>
          Go Home
        </Button>
      </Link>
    </Flex>
  );
}
