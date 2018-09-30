import { firebase } from "@firebase/app";
import { auth } from "firebase";
import "@firebase/firestore";
// let firebaseApp = null
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  });
}
let db = firebase.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

const googleAuthProvider = new auth.GoogleAuthProvider();
// Enabling this will force the user to select account.
// googleAuthProvider.setCustomParameters({
//   prompt: 'select_account'
// });
export { db, firebase, googleAuthProvider }
