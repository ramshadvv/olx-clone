import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDiDfWGN81t7KHHU-spSCpfsp_YfLUv0-E",
    authDomain: "olx-clone-8f349.firebaseapp.com",
    projectId: "olx-clone-8f349",
    storageBucket: "olx-clone-8f349.appspot.com",
    messagingSenderId: "722219819824",
    appId: "1:722219819824:web:edea96a7a729ee074c9ef5",
    measurementId: "G-428V6B094K"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);