import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import swal from 'sweetalert';
 

const config = {
    apiKey: "AIzaSyBdkpmUuHgjH8OgXaiiFbGl0_RPoRU8dx0",
    authDomain: "crown-db-dales79.firebaseapp.com",
    projectId: "crown-db-dales79",
    storageBucket: "crown-db-dales79.appspot.com",
    messagingSenderId: "391014272561",
    appId: "1:391014272561:web:968e75c99a7ade74758f10"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    
    console.log(snapShot);

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        swal('Error creating user', error.message);
      }
    } else {
        swal("User account already exists");
    }
  
    return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  


