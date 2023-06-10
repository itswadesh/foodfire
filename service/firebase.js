import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { apiKey, projectId, authDomain } from '~/config'
if (!firebase.apps.length) {
  firebase.initializeApp({ apiKey, projectId, authDomain })
}
let db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export { db, firebase, googleAuthProvider }
