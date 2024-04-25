// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCas2ERMjRJ-jcdb_N3yTtFKCJ6k3uSUxM",
  authDomain: "firstem-image.firebaseapp.com",
  projectId: "firstem-image",
  storageBucket: "firstem-image.appspot.com",
  messagingSenderId: "769534087553",
  appId: "1:769534087553:web:9d826aec998cc9b66d1880",
  measurementId: "G-HEXRNWQ8YE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
