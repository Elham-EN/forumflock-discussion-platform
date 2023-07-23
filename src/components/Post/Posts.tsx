/* eslint-disable react-hooks/exhaustive-deps */
import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import UsePosts from "@/hooks/usePosts";
import {
  FirestoreError,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { ReactElement, useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

interface PostsProps {
  communityData: Community;
}

function Posts({ communityData }: PostsProps): ReactElement {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = UsePosts();
  // Retrieve all posts from the database for particular community
  const getPosts = async () => {
    try {
      setLoading(true);
      // get posts for this community
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      // Convert to JavaScript object
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Store to post global state
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      const errorMsg = error as FirestoreError;
      console.log("HandleCreatePost Error", errorMsg.message);
    }
    setLoading(false);
  };

  // Call getPosts, when mounted on page
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={0}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
}

export default Posts;
