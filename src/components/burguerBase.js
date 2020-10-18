import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBcGph7d-xv_IM_xr0Tq0i_uUXckzzn5Tw",
    authDomain: "burguerqueen-a7db2.firebaseapp.com",
    databaseURL: "https://burguerqueen-a7db2.firebaseio.com",
    projectId: "burguerqueen-a7db2",
    storageBucket: "burguerqueen-a7db2.appspot.com",
    messagingSenderId: "713433781264",
    appId: "1:713433781264:web:7ad69a25339448f5966695",
    measurementId: "G-356J4ETD7W"
  };
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore(),
 	auth = firebase.auth(),
 	provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider}