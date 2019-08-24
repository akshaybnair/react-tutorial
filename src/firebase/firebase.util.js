import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';


const config = {
  apiKey: "AIzaSyBUFrjLPIevifQsxjzzzZ_myum2hT28kWo",
  authDomain: "crwn-db-36442.firebaseapp.com",
  databaseURL: "https://crwn-db-36442.firebaseio.com",
  projectId: "crwn-db-36442",
  storageBucket: "",
  messagingSenderId: "710136502269",
  appId: "1:710136502269:web:ee57d57bb777d98b"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'prompt': 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


