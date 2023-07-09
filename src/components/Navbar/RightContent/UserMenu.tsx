import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  Tooltip,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { User } from "firebase/auth";
import { VscAccount } from "react-icons/vsc";
import { BiLogOut, BiUser, BiLogIn } from "react-icons/bi";
import { FaUsers, FaUserAstronaut } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";

interface UserMenuProps {
  user: User | null | undefined;
}

function UserMenu({ user }: UserMenuProps): ReactElement {
  const resetCommunityState = useResetRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const logout = async () => {
    await signOut(auth);
    // Clear community state
    resetCommunityState();
  };
  return (
    <Menu>
      {user ? (
        <Tooltip label="" fontWeight={"bold"}>
          <span>
            <MenuButton
              cursor={"pointer"}
              padding={"5px"}
              borderRadius={5}
              outline="1px solid"
              outlineColor="gray.300"
            >
              <Flex align={"center"}>
                <Icon boxSize={7} as={FaUserAstronaut} />
                <Flex
                  direction={"column"}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={"10pt"}
                  ml={3}
                  align={"flex-start"}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex gap={1} align={"center"}>
                    <Icon as={HiSparkles} fontSize={16} color={"brand.100"} />
                    <Text color={"gray.600"}>1 karma</Text>
                  </Flex>
                </Flex>
                <ChevronDownIcon boxSize={7} />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<VscAccount size={24} />}
                fontWeight={"bold"}
                fontFamily={"sans-serif"}
                fontSize={"12pt"}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<AiOutlineSetting size={24} />}
                fontWeight={"bold"}
                fontFamily={"sans-serif"}
                fontSize={"12pt"}
              >
                User Setting
              </MenuItem>
              <MenuItem
                icon={<FaUsers size={24} />}
                fontWeight={"bold"}
                fontFamily={"sans-serif"}
                fontSize={"12pt"}
              >
                Create Community
              </MenuItem>
              <Divider borderColor={"gray.400"} />
              <MenuItem
                icon={<BiLogOut size={24} />}
                fontWeight={"bold"}
                fontFamily={"sans-serif"}
                fontSize={"13pt"}
                onClick={logout}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </span>
        </Tooltip>
      ) : (
        <>
          <MenuButton>
            <Icon
              boxSize={7}
              padding={1}
              height={10}
              width={10}
              borderRadius={5}
              as={BiUser}
              bg={"gray.200"}
              mt={1.5}
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<BiLogIn size={24} />}
              fontWeight={"bold"}
              fontFamily={"sans-serif"}
              fontSize={"13pt"}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              Log In / Sign Up
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default UserMenu;
