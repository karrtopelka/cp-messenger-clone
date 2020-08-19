import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0eEnpig-bpYN6HHz1RqHi_D6n9vK1oh8",
    authDomain: "cp-messenger-f0226.firebaseapp.com",
    databaseURL: "https://cp-messenger-f0226.firebaseio.com",
    projectId: "cp-messenger-f0226",
    storageBucket: "cp-messenger-f0226.appspot.com",
    messagingSenderId: "499373716329",
    appId: "1:499373716329:web:7aabbc4c04ff00263843f8",
    measurementId: "G-7SNS2DGJ8S",
});

const db = firebaseApp.firestore();

export default db;
