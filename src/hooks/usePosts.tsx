/* eslint-disable react-hooks/exhaustive-deps */
import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { Post, PostVote, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function UsePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const currentCommunity = useRecoilValue(communityState).currentCommunity;

  // args - the post you vote in that community
  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation(); // event is not trigger
    // Protect the voting feature agnainst users who are not authenticated
    // Open Authentication modal if user is not logged in
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
    }
    const { voteStatus } = post;
    // To tell if user has voted on this post before or not, by search
    // through the user's postVotes array and check if there is a vote
    // with a post id that matches this post
    const existingVote = postStateValue.postVotes.find(
      (vote) => vote.postId === post.id
    );
    try {
      // Create write batch
      const batch = writeBatch(firestore);
      // i have created copies of the current value of state and modify these copies
      // throghout these if else statement and at the very end i can take those
      // modified values and used to update the state. The reason of creating copies
      // of state and mutating the copies rather than the actual state itself to avoid
      // mutating the state directly because of unwanted side effects.
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      // represents the amount that are either going to add or subtract to the post
      // document's voteStatus. Will be modify throghout this if else logics
      let voteChange = vote; // use for updating Post Document
      // If this is a new vote, then
      if (!existingVote) {
        // Create a new postVote document on users's postVote subcollection
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote, // 1 or -1
        };
        //Store the data in the document
        batch.set(postVoteRef, newVote);
        // add/subtract 1 to/from post.voteStatus
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      }
      // Existing vote (user have voted already) - user modify the current vote
      else {
        // reference to already exiting postVote Document in postVotes
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );
        // Removing their vote (up => neutral OR down => neutral). Let say you try
        // vote again on post with existing vote and trying to send a vote value 1
        // again to this function and check if the existingVote'value equal to vote
        if (existingVote.voteValue === vote) {
          // add/subtract 1 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus - vote;
          // Remove the existing vote from our postVotes array
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          // delete the postVote document
          batch.delete(postVoteRef);
          voteChange *= -1;
        }
        // Flipping their vote (up => down OR down => up)
        else {
          // add/subtract 2 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus + 2 * vote;
          // find the index of existing vote in the array
          const voteIndex = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );
          // update the updatedPostVotes
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };
          // updating the existing postVote document
          batch.update(postVoteRef, {
            voteValue: vote,
          });
          voteChange = 2 * vote;
        }
      }

      // Update our post document (Database)
      const postRef = doc(firestore, "posts", post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();

      // find the post index in the posts array that we are voting on,
      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      // contain the post with lastest voteStatus
      updatedPosts[postIndex] = updatedPost;

      // Update Recoil UI State with updated values
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      // Check of existent of a selected post, we're voting on selected post
      // from the single post page
      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }
    } catch (error) {
      const errorFirestore = error as FirestoreError;
      console.log(errorFirestore.message);
    }
  };

  // Select a single post
  const onSelectPost = (post: Post): void => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/f/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // check if post contain image, then delete if exist
      if (post.imageURL) {
        // create an image reference to that image in the storage
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      // delete post document from the firestore database
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      // update the recoil global state for post
      setPostStateValue((prev) => ({
        ...prev,
        // contain all the post that does not match this post.id
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  // Fetch all of the users's postVotes for the currently community they are in
  const getCommunityPostVotes = async (communityId: string): Promise<void> => {
    const postVoteQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVoteQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  // call getCommunityPostVotes function, as soon as user lands in any given
  // community page (get lastest post votes data from firestore)
  useEffect(() => {
    // if user is not currently on community page or not authenticated
    if (!user || !currentCommunity?.id) return;
    getCommunityPostVotes(currentCommunity?.id);
  }, [user, currentCommunity]);

  useEffect(() => {
    if (!user) {
      // clear user post votes
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
}
