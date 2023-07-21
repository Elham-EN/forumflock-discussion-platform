import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Post {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
}

interface PostState {
  // Going to be used when actually do single page view of posts so when
  // user clicks on post, is going to store that post in the select post
  selectedPost: Post | null;
  // Going to be all of the post that are part of the community and also
  // store the posts that appears on the homepage
  posts: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
