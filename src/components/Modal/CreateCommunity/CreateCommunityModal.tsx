import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Text,
  Input,
  Box,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { ReactElement, useState, ChangeEvent } from "react";
import { FaUserFriends, FaEye, FaLock } from "react-icons/fa";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  FirestoreError,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

interface PropType {
  open: boolean;
  handleClose: () => void;
}

function CreateCommunityModal({ open, handleClose }: PropType): ReactElement {
  const [communityName, setCommunityName] = useState<string>("");
  const [charsRemaining, setCharsRemaining] = useState<number>(21);
  const [communityType, setCommunityType] = useState<string>("public");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    // recalculate how many chars we have left in name
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Valid the community
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // Check the community name must not contain special characters or
    // must have at the three character (length)
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be between 3-21 characters and can only " +
          " contains letters, numbers"
      );
      return;
    }

    setLoading(true);

    try {
      // First check if that community name is not taken, since it must be unique
      // Get document reference from the communities collection
      const communityDocRef = doc(firestore, "communities", communityName);
      // Get the community document
      const communityDoc = await getDoc(communityDocRef);
      // Check if this community document exist in the firestore
      if (communityDoc.exists()) {
        throw new Error(`Sorry, f/${communityName} is taken. Try another`);
      }
      // Now create / update community document (if does not exist then create one)
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
      handleClose();
    } catch (error) {
      const errorMsg = error as FirestoreError;
      setError(errorMsg.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent top={200}>
          <ModalHeader fontSize={"16pt"}>Create a Community</ModalHeader>
          <Divider borderColor={"gray.400"} maxWidth={"620px"} mx={"auto"} />
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} my={8}>
            <Text
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
              fontSize={"14pt"}
            >
              Name
            </Text>
            <Text color={"gray.500"} fontSize={"11pt"}>
              Community names including capitalization cannot be changed.
            </Text>
            <Text
              position={"relative"}
              fontSize={"18px"}
              top={"36px"}
              left={"10px"}
              width={"20px"}
              color={"gray.400"}
              fontWeight={"bold"}
              zIndex={100}
            >
              f/
            </Text>
            <Input
              position={"relative"}
              value={communityName}
              size={"lg"}
              pl={"29px"}
              fontSize={"18px"}
              fontFamily={"heading"}
              onChange={handleChange}
            />
            <Text
              mt={3}
              fontSize={"11pt"}
              color={charsRemaining === 0 ? "red" : "gray.500"}
            >
              {charsRemaining} Characters remaining
            </Text>
            {error && (
              <Text fontSize={"11pt"} color={"red.300"}>
                {error}
              </Text>
            )}
            <Box mt={5} mb={5}>
              <Text fontWeight={600} fontSize={"14pt"}>
                Community Type
              </Text>
              <Stack mt={4} spacing={4}>
                <Checkbox
                  name="public"
                  colorScheme="purple"
                  size={"lg"}
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align={"center"} gap={3}>
                    <Icon as={FaUserFriends} ml={2} color={"gray.500"} />
                    <Text fontWeight={600}>Public</Text>
                    <Text
                      fontSize={"14px"}
                      color={"gray.600"}
                      alignSelf={"flex-end"}
                      fontWeight={400}
                    >
                      Anyone can view, post, and comment to this community
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="restricted"
                  colorScheme="purple"
                  size={"lg"}
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align={"center"} gap={3}>
                    <Icon as={FaEye} ml={2} color={"gray.500"} />
                    <Text fontWeight={600}>Restricted</Text>
                    <Text
                      fontSize={"14px"}
                      color={"gray.600"}
                      alignSelf={"flex-end"}
                      fontWeight={400}
                    >
                      Anyone can view this community, but only approved users
                      can post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="private"
                  colorScheme="purple"
                  size={"lg"}
                  isChecked={communityType === "private"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align={"center"} gap={3}>
                    <Icon as={FaLock} ml={2} color={"gray.500"} />
                    <Text fontWeight={600}>Private</Text>
                    <Text
                      fontSize={"14px"}
                      color={"gray.600"}
                      alignSelf={"flex-end"}
                      fontWeight={400}
                    >
                      Only approved users can view and submit to this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter bg={"gray.100"}>
            <Button
              variant={"outline"}
              mr={3}
              onClick={handleClose}
              fontSize={"12pt"}
              fontWeight={"extrabold"}
            >
              Cancel
            </Button>
            <Button
              fontSize={"12pt"}
              fontWeight={"extrabold"}
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCommunityModal;
