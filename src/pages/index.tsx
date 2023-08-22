/* eslint-disable react-hooks/exhaustive-deps */
// ensures that the component follows the expected structure and
// has the correct props according to the NextPage
import type { NextPage } from "next";

import PageContent from "@/components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import { communityState } from "@/atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import UsePosts from "@/hooks/usePosts";
import { Post } from "@/atoms/postsAtom";
import PostLoader from "@/components/Post/PostLoader";
import PostItem from "@/components/Post/PostItem";
import CreatePostLink from "@/components/Community/CreatePostLink";

// Root URL (Route or Homepage),
const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const communityStateValue = useRecoilValue(communityState);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = UsePosts();

  // Build feed for authenticated users
  const buildUserHomeFeed = () => {};
  // Build feed for non-authenticated users
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    // if there is no user and not longer attempting to
    // fetch the user, then buildNoUserHomeFeed
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack spacing={3}>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage={true}
              />
            ))}
          </Stack>
        )}
      </>
      <>
        <Stack>
          <Text>About</Text>
        </Stack>
      </>
    </PageContent>
  );
};

export default Home;
