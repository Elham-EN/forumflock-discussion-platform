import { Timestamp } from "@google-cloud/firestore";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restriced" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}
