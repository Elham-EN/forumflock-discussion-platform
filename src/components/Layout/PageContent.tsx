import { Flex } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

// children is an array of two child component that is passed to it
// Easy way to create Custom Page Layout
function PageContent({ children }: PageContentProps): ReactElement {
  return (
    <Flex>
      <Flex>
        <Flex>{children && children[0 as keyof typeof children]}</Flex>
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
}

export default PageContent;
