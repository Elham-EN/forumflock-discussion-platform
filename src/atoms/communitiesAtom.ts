import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restriced" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  mySnippets: CommunitySnippet[];
  // Represent the current community we are in
  currentCommunity?: Community;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

// An atom represents a piece of state. Atoms can be
// read from and written to from any component.
export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
