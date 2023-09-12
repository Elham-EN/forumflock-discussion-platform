/* eslint-disable react-hooks/exhaustive-deps */
import { firestore } from "@/firebase/clientApp";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { ReactElement, useEffect } from "react";
import { Community, communityState } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/NotFound";
import safeJsonStringify from "safe-json-stringify";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Post/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";
import useCommunityData from "@/hooks/useCommunityData";

interface CommunityPageProps {
  communityData: Community;
}

function CommunityPage({ communityData }: CommunityPageProps): ReactElement {
  const setCommunityStateValue = useSetRecoilState(communityState);
  const { communityStateValue } = useCommunityData();

  // Get list of users
  const getUsers = async () => {
    const members = query(
      collectionGroup(firestore, "communitySnippets"),
      where("communityId", "==", communityData.id)
    );
    const querySnapshot = await getDocs(members);
  };

  useEffect(() => {
    getUsers();
    // Now the global state has access to current Community data
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  // Community was not found in the database
  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        {/* Pass two children to the parent component PageContent using fragment */}
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity} />
          )}
        </>
      </PageContent>
    </>
  );
}

// Server side rendering - getServerSideProp is called on Next Server and data
// is feteched from our database in this function and pass it to the component
// and the component is rendered on the server and then passed to the client
// and then the client to render the component
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data from the database and pass it to the client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        // Solve the serializing
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("server-side-error:", error);
    return { props: {} };
  }
}

export default CommunityPage;
