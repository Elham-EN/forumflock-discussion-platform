import { Post, postState } from "@/atoms/postsAtom";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { ReactElement, useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import {
  FirestoreError,
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";
import { log } from "console";

interface CommentsProps {
  user: User;
  selectedPost: Post | null;
  communityId: string;
}

function Comments({
  user,
  selectedPost,
  communityId,
}: CommentsProps): ReactElement {
  const [commentText, setCommentText] = useState<string>("");
  // represent all of the comments for this post coming from DB
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<string>("");
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      // Create Batch Instance
      const batch = writeBatch(firestore);
      // Create a comment document
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);
      // Update post numberOfComments +1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      // Update UI client recoil global state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
    setCreateLoading(false);
  };

  const getPostComments = async () => {
    try {
      // Query - fetch all comments where the post id equals
      // to the selectedPost.Id
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc") // latest comment on top
      );
      // get list of comments docs from firestore
      const commentDocs = await getDocs(commentsQuery);
      // Convert to JavaScript object
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
    setFetchLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setLoadingDelete(comment.id);
    try {
      const batch = writeBatch(firestore);
      // Delete comment document
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);
      // Update post numberOfComment -1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });
      await batch.commit();
      // Update client recoil global state
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
      // Only include comments that does not match id of the comment
      // we deleted
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      const firestoreError = error as FirestoreError;
      console.log(firestoreError.message);
    }
    setLoadingDelete("");
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost, comments]);

  return (
    <Box bg={"white"} borderRadius={"0px 0px 5px 5px"} p={3}>
      <Flex
        direction={"column"}
        pl={10}
        pr={4}
        mb={6}
        fontSize={"14pt"}
        width={"100%"}
      >
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item}>
                <SkeletonCircle size={"10"} />
                <SkeletonText mt={4} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                borderTop={"1px solid"}
                borderColor={"gray.300"}
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  {" "}
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment: Comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDelete === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Comments;
