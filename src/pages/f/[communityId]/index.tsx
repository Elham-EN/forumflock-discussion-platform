import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { ReactElement } from "react";
import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/NotFound";
import safeJsonStringify from "safe-json-stringify";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";

interface CommunityPageProps {
  communityData: Community;
}

function CommunityPage({ communityData }: CommunityPageProps): ReactElement {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        {/* Pass two children to the parent component PageContent using fragment */}
        <>
          <div>LHS</div>
        </>
        <>
          <div>RHS</div>
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
  }
}

export default CommunityPage;
