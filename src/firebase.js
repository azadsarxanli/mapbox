// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7XPNTsMDEK09eyOY6VhaSoiDv-93Y8jg",
  authDomain: "mapbox-7fd95.firebaseapp.com",
  projectId: "mapbox-7fd95",
  storageBucket: "mapbox-7fd95.appspot.com",
  messagingSenderId: "546072390616",
  appId: "1:546072390616:web:ffb4f23a395d5558c9a0ad",
  measurementId: "G-SXMGQV5SW1",
  databaseURL: 'https://mapbox-7fd95-default-rtdb.firebaseio.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default db;