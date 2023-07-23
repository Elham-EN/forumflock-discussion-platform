import { Stack, Box, SkeletonText, Skeleton } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function PostLoader(): ReactElement {
  return (
    <Stack spacing={6}>
      <Box padding={"10px 6px"} boxShadow={"lg"} bg={"white"} borderRadius={5}>
        <SkeletonText mt={"4"} noOfLines={1} width={"40%"} spacing={4} />
        <SkeletonText mt={"4"} noOfLines={4} spacing={4} />
        <Skeleton mt={4} height={"200px"} />
      </Box>
      <Box padding={"10px 6px"} boxShadow={"lg"} bg={"white"} borderRadius={5}>
        <SkeletonText mt={"4"} noOfLines={1} width={"40%"} spacing={4} />
        <SkeletonText mt={"4"} noOfLines={4} spacing={4} />
        <Skeleton mt={4} height={"200px"} />
      </Box>
    </Stack>
  );
}
