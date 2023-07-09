/* eslint-disable react-hooks/exhaustive-deps */
import {
  Community,
  CommunitySnippet,
  CommunityState,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs, FirestoreError } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

interface UseCommunityDataHook {
  communityStateValue: CommunityState;
  onJoinOrLeaveCommunity: (communityData: Community, isJoined: boolean) => void;
  loading: boolean;
  error: string;
}

// The global state and it's functionailty are use multiple places in the application
export default function useCommunityData(): UseCommunityDataHook {
  // Components that need to read from and write to an atom
  // should use useRecoilState()
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState<CommunityState>(communityState);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // Retrieve authentic user/ logged in user data
  const [user] = useAuthState(auth);

  // Decide which of these two to call?
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ): void => {
    // Check if the user signed in ? If not => open auth modal
    if (isJoined) {
      // if they are, then they can leave the community
      leaveCommunity(communityData.id);
    }
    // If user has not join a community yet
    joinCommunity(communityData.id);
  };

  const joinCommunity = (communityId: string): void => {};

  const leaveCommunity = (communityId: string): void => {};

  // Fetch the user's results of communitysnippet from the database and
  // store them into mySnippets array
  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        // Get Users (Collection) Snippets of the current logged in user
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      // Convert collection of doc data to javascript object to store
      // them in to state
      const snippets = snippetDocs.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      const errorMsg = error as FirestoreError;
      setError(errorMsg.message);
      console.log(errorMsg.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return; // if user is not autheticated,
    getMySnippets(); // call this when user is autheticated
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    error,
  };
}
