import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBGzT84IoYMuJJwPj-D1f7COW5AeU-v9n4",
    authDomain: "fire-base-starting-up-om.firebaseapp.com",
    projectId: "fire-base-starting-up-om",
    storageBucket: "fire-base-starting-up-om.appspot.com",
    messagingSenderId: "701663568380",
    appId: "1:701663568380:web:fbe131006cab998d211279",
    measurementId: "G-X0JTY0JKW7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
