import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyADNt_2Xyn5L6nbqSQxJ30UIp5ln5hrCqM",
    authDomain: "e-commerce13.firebaseapp.com",
    projectId: "e-commerce13",
    storageBucket: "e-commerce13.appspot.com",
    messagingSenderId: "50363472362",
    appId: "1:50363472362:web:cc9655a7366baf1eda3a93",
    measurementId: "G-SPYVX5C7ZJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const customerDB = collection(db, "customers");
export const sellerDB = collection(db, "sellers");
export const productDB = collection(db, "products");
export const categoryDB = collection(db, "category");
export const cartDB = collection(db, "cart");