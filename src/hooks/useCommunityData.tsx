/* eslint-disable react-hooks/exhaustive-deps */
import { authModalState } from "@/atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  CommunityState,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  FirestoreError,
  writeBatch,
  doc,
  increment,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

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
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // Retrieve authentic user/ logged in user data
  const [user] = useAuthState(auth);

  // Decide which of these two to call?
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined?: boolean
  ): void => {
    // if user is not authenticated / logged in
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setLoading(true);
    // Check if the user signed in ? If not => open auth modal
    if (isJoined) {
      // if they are, then they can leave the community
      leaveCommunity(communityData.id);
      return;
    }
    // If user has not join a community yet
    joinCommunity(communityData);
  };

  const joinCommunity = async (communityData: Community): Promise<void> => {
    try {
      const batch = writeBatch(firestore); // Batch Write
      // No moderator prop because not owner of this community
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      // Creating a new community snippet if this user is joining the community
      batch.set(
        doc(
          firestore, // Client Instace
          `users/${user?.uid}/communitySnippets`, // Path to store this data
          communityData.id // the id of this newly created document
        ),
        newSnippet // the data to put inside the document
      );
      // Update the number of members of that community +1
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit(); // execute the batch write operations
      // Update recoil state - communityState.mySnippet (Update the UI)
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
      console.log(communityStateValue.mySnippets);
    } catch (error) {
      const errorMsg = error as FirestoreError;
      setError(errorMsg.message);
      console.log("joinCommunity error: ", errorMsg);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string): Promise<void> => {
    try {
      // Batch Write
      const batch = writeBatch(firestore);
      // Deleting the community snippet if this user is leaving the community
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      // Update the number of members of that community -1
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      // Update recoil state - communityState.mySnippet (Update the UI)
      setCommunityStateValue((prev) => ({
        ...prev,
        // remove the snippet that match the communityId
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
      console.log(communityStateValue.mySnippets);
    } catch (error) {
      const errorMsg = error as FirestoreError;
      setError(errorMsg.message);
      console.log("joinCommunity error: ", errorMsg);
    }
    setLoading(false);
  };

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
      console.log("getMySnippets error:", errorMsg.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // if user is not autheticated,
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
      }));
    }
    getMySnippets(); // call this when user is autheticated
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    error,
  };
}
