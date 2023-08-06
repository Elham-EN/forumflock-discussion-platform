/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "@/atoms/postsAtom";
import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import Comments from "@/components/Post/Comments/Comments";
import PostItem from "@/components/Post/PostItem";
import PostLoader from "@/components/Post/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import UsePosts from "@/hooks/usePosts";
import { Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FirestoreError, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement, use, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostPage(): ReactElement {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    UsePosts();
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateValue } = useCommunityData();
  const { pid } = router.query;

  const fetchPost = async () => {
    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", pid as string);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log("fetchPost error", firestoreError.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("community", pid);
    if (pid && !postStateValue.selectedPost) {
      fetchPost();
    }
  }, [router.query, postStateValue.selectedPost]);
  return (
    <PageContent>
      {loading ? (
        <PostLoader />
      ) : (
        <div style={{ marginTop: "5em" }}>
          {postStateValue.selectedPost && (
            <PostItem
              post={postStateValue.selectedPost}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find(
                  (item) => item.postId === postStateValue.selectedPost!.id
                )?.voteValue
              }
              userIsCreator={
                user?.uid === postStateValue.selectedPost?.creatorId
              }
            />
          )}
          <Comments
            user={user as User}
            communityId={postStateValue.selectedPost?.communityId as string}
            selectedPost={postStateValue.selectedPost}
          />
        </div>
      )}
      <div style={{ marginTop: "5em" }}>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </div>
    </PageContent>
  );
}
