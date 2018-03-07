import Firebase from 'firebase'
import fireStore from 'firebase/firestore'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyDxNXXERrH_Jk8gVPEoXvyEJ_gwhoLcoaM",
    authDomain: "fproject239.firebaseapp.com",
    databaseURL: "https://fproject239.firebaseio.com",
    projectId: "fproject239",
    storageBucket: "",
    messagingSenderId: "910040253232"
  });



export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
