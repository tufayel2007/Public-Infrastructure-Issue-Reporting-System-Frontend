// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ5xUeqDXsVJlOGoqs-zR4ljyEmh7Fwbs",
  authDomain: "issue-hub-e6b74.firebaseapp.com",
  projectId: "issue-hub-e6b74",
  storageBucket: "issue-hub-e6b74.firebasestorage.app",
  messagingSenderId: "807372817904",
  appId: "1:807372817904:web:368457b9c38e8c52da0935",
  measurementId: "G-1729PPCX1R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged };
export default { app, auth };
