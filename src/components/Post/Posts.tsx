/* eslint-disable react-hooks/exhaustive-deps */
import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import {
  FirestoreError,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { ReactElement, useEffect, useState } from "react";

interface PostsProps {
  communityData: Community;
}

function Posts({ communityData }: PostsProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  // Retrieve all posts from the database for particular community
  const getPosts = async () => {
    try {
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
      console.log(posts);
    } catch (error) {
      const errorMsg = error as FirestoreError;
      console.log("HandleCreatePost Error", errorMsg.message);
    }
  };

  // Call getPosts, when mounted on page
  useEffect(() => {
    getPosts();
  }, []);
  return <div>Posts</div>;
}

export default Posts;
