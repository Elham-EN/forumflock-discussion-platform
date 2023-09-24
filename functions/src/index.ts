import * as functions from "firebase-functions";
// Firebase Admin SDK is a server-side library for Firebase that allows
// you to interact with Firebase from privileged environments, such as
// servers or cloud functions.
import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// Boot up our app on the server
admin.initializeApp();

// Access our database using this instance
const db = admin.firestore();

// Create cloud function - create users collection and user document
// listen for event when user signup / create account
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    };
    db.collection("users")
      // create a new document with the user's uid
      .doc(user.uid)
      .set(newUser);
  });

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

export const notifyOnPost = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    try {
      // Get the data of the newly created post
      const newPostData = snap.data() as Post;
      // Fetch the communityId from the new post's data
      const communityId = newPostData.communityId;
      // Fetch the creatorId from the new post's data
      const creatorId = newPostData.creatorId;
      // Query to fetch all users who have a communitySnippets
      // document with the same communityId
      const querySnapshot = await admin
        .firestore()
        .collectionGroup("communitySnippets")
        .where("communityId", "==", communityId)
        .get();
      functions.logger.error("Users", querySnapshot.empty);

      const communityMembers: any[] = [];
      querySnapshot.forEach((doc) => {
        const userId = doc.ref.parent.parent?.id;
        if (userId) {
          communityMembers.push(userId);
        }
      });
      // Create a notification for each member, except
      // for the one who created the post
      const username = newPostData.creatorDisplayName;
      const postTitle = newPostData.title;
      const promises = communityMembers
        .filter((memberId) => memberId !== creatorId)
        .map((memberId) => {
          return admin
            .firestore()
            .collection(`users/${memberId}/notifications`)
            .add({
              message: `${username} created new post in ${communityId} community`,
              postTitle,
              communityId,
              read: false,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
              type: "PostNotification",
            });
        });
      return Promise.all(promises);
    } catch (error) {
      functions.logger.error("An error occurred for notifyOnPost:", error);
      return null;
    }
  });

// automatically delete old notifications from Firebase Firestore
export const deleteOldNotifications = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    // 30 days ago
    const threshold = Timestamp.fromMillis(
      Date.now() - 30 * 24 * 60 * 60 + 1000
    );

    const deleteOldNotificationsSnapshot = await admin
      .firestore()
      .collectionGroup("notifications")
      .where("timestamp", "<", threshold)
      .get();

    const batch = admin.firestore().batch();
    deleteOldNotificationsSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  });

interface Comment {
  id: string;
  postId: string;
  communityId: string;
  creatorDisplayText: string;
  creatorId: string;
  postTitle: string;
  text: string;
}

// Notify user that somebody commented on their post
export const notifyOnComment = functions.firestore
  .document("comments/{commentId}")
  .onCreate(async (snap, context) => {
    try {
      const newCommentData = snap.data() as Comment;
      // The community name where this post reside
      const communityId = newCommentData.communityId;
      // User who commennt on the post
      const creatorId = newCommentData.creatorId;
      const commentId = newCommentData.id;
      // Fetch users who are in the same community
      const querySnapshot = await admin
        .firestore()
        .collectionGroup("communitySnippets")
        .where("communityId", "==", communityId)
        .get();
      const communityMembers: any[] = [];
      querySnapshot.forEach((doc) => {
        const userId = doc.ref.parent.parent?.id;
        if (userId) {
          communityMembers.push(userId);
        }
      });
      // show error log if there is error
      functions.logger.error("No collection of users");
      //create a notification for each member
      const username = newCommentData.creatorDisplayText; // user who commented
      const postTitle = newCommentData.postTitle;
      const promises = communityMembers
        .filter((memberId) => memberId !== creatorId)
        .map((memberId) => {
          return admin
            .firestore()
            .collection(`users/${memberId}/notifications`)
            .add({
              message: `${username} commented on the post in ${communityId} community`,
              postTitle,
              communityId,
              commentId,
              read: false,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
              type: "CommentNotification",
            });
        });
      return Promise.all(promises);
    } catch (error) {
      functions.logger.error("An error occurred for notifyOnComment:", error);
      return null;
    }
  });
