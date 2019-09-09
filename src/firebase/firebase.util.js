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
export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  documentsToAdd.forEach(document => {
    const newDocumentRef = collectionRef.doc();
    batch.set(newDocumentRef, document);
  });
  return await batch.commit()
}


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map( doc => {
    const {title, items} = doc.data();

    return {
      routeName : encodeURI(title.toLowerCase() ),
      id : doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase() ] = collection;
    return accumulator
  }, {})
}

export const createUserProfileDocument = async ( userAuth, additionalData) => {
  if ( !userAuth ) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshop = await userRef.get();
  if( ! snapshop.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData 
      });
    } catch( error) {
      console.log(error);
    }
  } 
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'prompt': 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


