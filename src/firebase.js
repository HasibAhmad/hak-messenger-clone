import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0JfVaJ6L6sbSdCGGlwCerYBVTbOILUxY",
    authDomain: "hak-messenger.firebaseapp.com",
    databaseURL: "https://hak-messenger.firebaseio.com",
    projectId: "hak-messenger",
    storageBucket: "hak-messenger.appspot.com",
    messagingSenderId: "727425365092",
    appId: "1:727425365092:web:2ec11f0a4d244fa1601b71",
    measurementId: "G-JYGKFSPQY3"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth()

export { db, auth };