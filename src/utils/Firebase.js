import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB7hSoq60GoEyi5vU0IgvothPIQzL1f2M4",
    authDomain: "savagecarol-a93cd.firebaseapp.com",
    projectId: "savagecarol-a93cd",
    storageBucket: "savagecarol-a93cd.firebasestorage.app",
    messagingSenderId: "858402041638",
    appId: "1:858402041638:web:203daf67f2edbed6449be7",
    measurementId: "G-1E1N0PRMP7"
  };
  
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firestore, auth , storage}
