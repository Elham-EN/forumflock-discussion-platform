/* eslint-disable react-hooks/exhaustive-deps */
// ensures that the component follows the expected structure and
// has the correct props according to the NextPage
import type { NextPage } from "next";
import PageContent from "@/components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import {
  DocumentData,
  FirestoreError,
  Query,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import UsePosts from "@/hooks/usePosts";
import { Post, PostVote } from "@/atoms/postsAtom";
import PostLoader from "@/components/Post/PostLoader";
import PostItem from "@/components/Post/PostItem";
import CreatePostLink from "@/components/Community/CreatePostLink";
import useCommunityData from "@/hooks/useCommunityData";
import Recommendation from "@/components/Community/Recommendation";

// Root URL (Route or Homepage),
const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = UsePosts();

  // For Pagination
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<null | DocumentData>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Build feed for authenticated users
  const buildUserHomeFeed = async () => {
    try {
      setLoading(true);
      // if user joined a community
      // get the ids of communities this user has joined
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        // get posts from users's communities he/her joined
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
        setLoading(false);
      } else {
        // if not, show them generic feeds
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("buildUserHomeFeed error", error);
    }
  };

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

  const fetchPostsForNonAuthUsers = async (last?: DocumentData | null) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let postQuery: Query<DocumentData>;
    if (last) {
      postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        startAfter(last),
        limit(5)
      );
    } else {
      postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(5)
      );
    }
    try {
      const postDocs = await getDocs(postQuery);
      const newPosts = postDocs.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Post)
      );

      if (newPosts.length > 0) {
        setLastVisible(postDocs.docs[postDocs.docs.length - 1]);
        setPostStateValue((prev) => ({
          ...prev,
          posts: [...prev.posts, ...newPosts],
        }));
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log("Fetch Post Error: ", firestoreError.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("getUserPostVotes error", error);
    }
  };

  useEffect(() => {
    if (user && postStateValue.posts.length) {
      getUserPostVotes();
    }
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);

  useEffect(() => {
    // if there is no user and not longer attempting to
    // fetch the user, then buildNoUserHomeFeed
    if (!user && !loadingUser && postStateValue.posts.length === 0)
      fetchPostsForNonAuthUsers();
  }, [user, loadingUser]);

  // We call this function until, it has fetched community
  // snippet from the database
  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);

  return (
    <PageContent>
      <>
        {/* <CreatePostLink />
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
        )} */}
        <CreatePostLink />
        <InfiniteScroll
          dataLength={postStateValue.posts.length}
          next={() => fetchPostsForNonAuthUsers(lastVisible)}
          hasMore={hasMore}
          loader={<PostLoader />} // Replace with your loading component or spinner
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
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
        </InfiniteScroll>
      </>
      <>
        <Recommendation />
      </>
    </PageContent>
  );
};

export default Home;
