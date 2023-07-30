import { Post, PostVote, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

export default function UsePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);

  // args - the post you vote in in that community
  const onVote = async (post: Post, vote: number, communityId: string) => {
    // Protect the voting feature agnainst users who are not authenticated
    // Open Authentication modal if user is not logged in

    try {
      const { voteStatus } = post;

      // To tell if user has voted on this post before or not, by search
      // through the user's postVotes array and check if there is a vote
      // with a post id that matches this post
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );

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
      let voteChange = vote;

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
        // Removing their vote (up => neutral OR down => neutral)
        if (existingVote) {
          // add/subtract 1 to/from post.voteStatus
          // delete the postVote document
        }
        // Flipping their vote (up => down OR down => up)
        else {
          // add/subtract 2 to/from post.voteStatus
          // updating the existing postVote document
        }
      }
    } catch (error) {
      const errorFirestore = error as FirestoreError;
      console.log(errorFirestore.message);
    }
  };

  const onSelectPost = () => {};

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
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
}
