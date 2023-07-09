import { Flex } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

// children is an array of two child component that is passed to it
// Easy way to create Custom Page Layout
function PageContent({ children }: PageContentProps): ReactElement {
  return (
    <Flex justify={"center"} padding={"16px 0px"}>
      <Flex width={"90%"} justify={"center"} maxWidth={"1460px"}>
        {/* LHS */}
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          direction={"column"}
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PageContent;
