/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Icon } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import { BsChevronDown } from "react-icons/bs";

type RightContentProps = {
  user: User | null | undefined;
};

function RightContent({ user }: RightContentProps): ReactElement {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {/* If user is logged in, icons are shown
        If user is not logged in, authentication buttons are shown */}
        {user ? <Icons /> : <AuthButtons displayType="none" />}
        <Flex align={"center"} gap={1}>
          <UserMenu user={user} />
          <Icon as={BsChevronDown} boxSize={"12pt"} />
        </Flex>
      </Flex>
    </>
  );
}

export default RightContent;
