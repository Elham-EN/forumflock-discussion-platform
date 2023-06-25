/* eslint-disable react/no-unescaped-entities */
import { Button, Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user: User | null | undefined;
};

function RightContent({ user }: RightContentProps): ReactElement {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"} mx={5}>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
}

export default RightContent;
