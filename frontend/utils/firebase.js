// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "lmsauth-23b87.firebaseapp.com",
  projectId: "lmsauth-23b87",
  storageBucket: "lmsauth-23b87.firebasestorage.app",
  messagingSenderId: "606256806627",
  appId: "1:606256806627:web:c28ef4b592dfdfe31d23d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}