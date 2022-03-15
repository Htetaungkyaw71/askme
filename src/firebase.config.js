// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIfahO2ccElf2gMz_K-ZrGzCkRddlSEcE",
  authDomain: "ask-me-376ee.firebaseapp.com",
  projectId: "ask-me-376ee",
  storageBucket: "ask-me-376ee.appspot.com",
  messagingSenderId: "1038956422075",
  appId: "1:1038956422075:web:608e8e6479772216de5a9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()