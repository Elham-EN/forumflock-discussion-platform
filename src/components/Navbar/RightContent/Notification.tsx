/* eslint-disable react-hooks/exhaustive-deps */
import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  FirestoreError,
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ReactElement, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { BiFace } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import Link from "next/link";

interface NotificationDetails {
  id: string;
  message: string;
  read: boolean;
  timestamp: Timestamp;
  postTitle: string;
  communityId: string;
}

export default function Notification(): ReactElement {
  const [notifications, setNotification] = useState<NotificationDetails[]>();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const getNotifications = async (): Promise<void> => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, `users/${user?.uid}/notifications`),
        orderBy("timestamp", "desc")
      );
      const notificationDocs = await getDocs(q);
      let unread = 0;
      const notificationArr = notificationDocs.docs.map((item) => {
        if (!item.data().read) {
          unread++;
        }
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setNotification(notificationArr as NotificationDetails[]);
      setLoading(false);
      setUnreadCount(unread);
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
  };

  const markNotificationAsRead = async () => {
    try {
      const q = query(
        collection(firestore, `users/${user?.uid}/notifications`),
        where("read", "==", false)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docSnapshot) => {
        updateDoc(
          doc(firestore, `users/${user?.uid}/notifications`, docSnapshot.id),
          { read: true }
        );
      });
      // Update client state
      setUnreadCount(0);
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
  };

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user]);

  return (
    <Menu onOpen={markNotificationAsRead}>
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
            {unreadCount > 0 && unreadCount}
          </Text>
        </Box>
      </MenuButton>
      <MenuList shadow={"2xl"} maxHeight="400px" overflowY="auto">
        {notifications?.map((item) => (
          <NotificationDetails
            key={item.id}
            message={item.message}
            read={item.read}
            timestamp={item.timestamp}
            id={item.id}
            postTitle={item.postTitle}
            communityId={item.communityId}
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
      style={{ whiteSpace: "normal", maxWidth: "450px" }}
    >
      <Link href={`/f/${props.communityId}`}>
        <Flex px={2} py={3} gap={10} align={"center"} justify={"center"}>
          <Flex>
            <Icon as={BiFace} boxSize={"10"} />
          </Flex>
          <Flex direction={"column"}>
            <Text display={"block"} fontSize={"14pt"}>
              {props.message}{" "}
            </Text>
            <Text fontSize={"14pt"} fontWeight={"bold"} color={"gray.400"}>
              {moment(props.timestamp.toDate()).fromNow()}
            </Text>
            <Text fontSize={"14pt"} fontWeight={"semibold"}>
              {props.postTitle}
            </Text>
          </Flex>
        </Flex>
      </Link>
    </MenuItem>
  );
}
