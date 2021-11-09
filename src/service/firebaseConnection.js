import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyD7e8VMr-30Qmuw4vN3LZTGDohUitH1jj4",
  authDomain: "cookinghome-a99af.firebaseapp.com",
  databaseURL: "https://cookinghome-a99af-default-rtdb.firebaseio.com",
  projectId: "cookinghome-a99af",
  storageBucket: "cookinghome-a99af.appspot.com",
  messagingSenderId: "378602046436",
  appId: "1:378602046436:web:513529a08d94d48641bdf1",
  measurementId: "G-HSJ74204DZ",
};
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
