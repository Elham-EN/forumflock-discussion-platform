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

export interface PostVote {
  id: string;
  postId: string; // the id of post this vote belongs to
  communityId: string; // the community this post is in
  voteValue: number; // 1 for upvote and -1 for downvote
}

interface PostState {
  // Going to be used when actually do single page view of posts so when
  // user clicks on post, is going to store that post in the select post
  selectedPost: Post | null;
  // Going to be all of the post that are part of the community and also
  // store the posts that appears on the homepage
  posts: Post[];
  postVotes: PostVote[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
