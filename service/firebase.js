import { firebase } from "@firebase/app";
import { auth } from "firebase";
import "@firebase/firestore";
import { apiKey,projectId,authDomain } from '~/config';

// let firebaseApp = null
if (!firebase.apps.length) {
  firebase.initializeApp({ apiKey,projectId,authDomain });
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
