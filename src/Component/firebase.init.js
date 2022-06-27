// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr78OaYQfuADIorOIAq5BK1RYg8wMZhlo",
  authDomain: "outshade-62cdc.firebaseapp.com",
  projectId: "outshade-62cdc",
  storageBucket: "outshade-62cdc.appspot.com",
  messagingSenderId: "136470913301",
  appId: "1:136470913301:web:3f9c6fed60eeed7b1fc91c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;