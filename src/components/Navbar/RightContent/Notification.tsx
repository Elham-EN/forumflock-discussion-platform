import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  FirestoreError,
  Timestamp,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { ReactElement, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { BiFace } from "react-icons/bi";
import { BsBell } from "react-icons/bs";

interface NotificationDetails {
  id: string;
  message: string;
  read: boolean;
  timestamp: Timestamp;
}

export default function Notification(): ReactElement {
  const [notifications, setNotification] = useState<NotificationDetails[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const getNotification = async (): Promise<void> => {
    setLoading(true);
    try {
      const notificationDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/notifications`)
      );
      const notificationArr = notificationDocs.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setNotification(notificationArr as NotificationDetails[]);
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
  };

  useEffect(() => {
    if (user) {
      getNotification();
    }
  }, [user]);

  return (
    <Menu>
      <MenuButton as={Button} variant={"unstyled"} position={"relative"}>
        <Icon as={BsBell} boxSize={"7"} />
        <Box
          position={"absolute"}
          top={0}
          left={"5"}
          bg={"brand.100"}
          px={2}
          borderRadius={"full"}
        >
          <Text fontSize={"12pt"} color={"white"}>
            {notifications?.length}
          </Text>
        </Box>
      </MenuButton>
      <MenuList maxW={"95%"} shadow={"2xl"}>
        {notifications?.map((item) => (
          <NotificationDetails
            key={item.id}
            message={item.message}
            read={item.read}
            timestamp={item.timestamp}
            id={item.id}
          />
        ))}
      </MenuList>
    </Menu>
  );
}

function NotificationDetails(props: NotificationDetails): ReactElement {
  return (
    <MenuItem
      _hover={{ backgroundColor: "gray.100", shadow: "dark-lg" }}
      borderBottom={"1px solid"}
      borderColor={"gray.300"}
    >
      <Flex px={2} py={3} gap={3} align={"center"}>
        <Flex>
          <Icon as={BiFace} boxSize={"7"} />
        </Flex>
        <Flex direction={"column"}>
          <Text fontSize={"14pt"}>{props.message}</Text>
          <Text fontSize={"14pt"} fontWeight={"bold"} color={"gray.400"}>
            {moment(props.timestamp.toDate()).fromNow()}
          </Text>
        </Flex>
      </Flex>
    </MenuItem>
  );
}
