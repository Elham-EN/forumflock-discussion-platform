import * as functions from "firebase-functions";
// Firebase Admin SDK is a server-side library for Firebase that allows
// you to interact with Firebase from privileged environments, such as
// servers or cloud functions.
import * as admin from "firebase-admin";

// Boot up our app on the server
admin.initializeApp();

// Access our database using this instance
const db = admin.firestore();

// Create cloud function - create users collection and user document
// when user signup / create account
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
