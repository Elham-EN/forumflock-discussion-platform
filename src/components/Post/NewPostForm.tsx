import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { BsLink } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { IconType } from "react-icons";
import TabItem from "./TabItem";
import TextInput from "./PostForm/TextInput";
import ImageUpload from "./PostForm/ImageUpload";
import { User } from "firebase/auth";
import { Post } from "@/atoms/postsAtom";
import {
  FirestoreError,
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import useSelectFile from "@/hooks/useSelectFile";

interface NewPostFormProps {
  user: User;
  communityId: string;
  communityImageURL?: string;
}

export interface FormTabsType {
  title: string;
  icon: IconType;
}

// Created multi-tap navigation (static Array)
const formTabs: FormTabsType[] = [
  {
    title: "Post",
    icon: IoCreate,
  },
  {
    title: "Images & Video",
    icon: GoFileMedia,
  },
  {
    title: "Link",
    icon: BsLink,
  },
  {
    title: "Poll",
    icon: MdOutlinePoll,
  },
];

interface TextInputType {
  title: string;
  body: string;
}

function NewPostForm({
  user,
  communityId,
  communityImageURL,
}: NewPostFormProps): ReactElement {
  const router = useRouter();
  // Track which tab item is currently selected
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  const [textInputs, setTextInputs] = useState<TextInputType>({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const handleCreatePost = async () => {
    // Create new post object => type Post
    const newPost: Post = {
      communityId: communityId,
      communityImageURL: communityImageURL || "",
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      if (!textInputs.title) {
        throw new Error("Cannot post without a title");
      }
      // Store the post in the firestore DB "Posts" Collection
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // Check if file is selected
      if (selectedFile) {
        // Create a reference to firebase storage
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        // Then store / upload the selected file in firebase storage
        await uploadString(imageRef, selectedFile, "data_url");
        // Then download the image url from the firebase storage
        const downloadURL = await getDownloadURL(imageRef);
        // Then update the Post Doc with add image url
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        setError("");
      }
      // redirect the user back to the communityPage
      router.back();
    } catch (error) {
      const errorMsg = error as FirestoreError;
      console.log("HandleCreatePost Error", errorMsg.message);
      setError(errorMsg.message);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={5}>
      <Flex width={"100%"}>
        {/** selected prop is a boolean type that represent if this particular tab
         * item is currently selected one. True if this tab is selected
         */}
        {formTabs.map((item) => (
          <TabItem
            item={item}
            key={item.title}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={5}>
        {/** Display content based on the tab clicked */}
        {selectedTab === "Post" && (
          <TextInput
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            onSelectImage={onSelectFile}
            selectedFile={selectedFile}
          />
        )}
        {selectedTab === "Link" && (
          <Flex w={"full"} justify={"center"}>
            <Flex
              direction="column"
              bg={"brand.100"}
              p={10}
              color={"white"}
              textAlign={"center"}
            >
              <Text fontSize={"2xl"} fontWeight={700}>
                Functionality Coming Soon
              </Text>
              <Text>Currently, this functionality is not available</Text>
            </Flex>
          </Flex>
        )}
        {selectedTab === "Poll" && (
          <Flex w={"full"} justify={"center"}>
            <Flex
              direction="column"
              bg={"brand.100"}
              p={10}
              color={"white"}
              textAlign={"center"}
            >
              <Text fontSize={"2xl"} fontWeight={700}>
                Functionality Coming Soon
              </Text>
              <Text>Currently, this functionality is not available</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Post Error</AlertTitle>
          <AlertDescription>
            {error ? error : "Error creating post"}
          </AlertDescription>
        </Alert>
      )}
    </Flex>
  );
}

export default NewPostForm;
