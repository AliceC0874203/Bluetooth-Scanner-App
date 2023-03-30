// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBs65rTCrW3dbRtiFPoNTNBSKNYSR6bSzk",
  authDomain: "eigenintershiptest.firebaseapp.com",
  projectId: "eigenintershiptest",
  storageBucket: "eigenintershiptest.appspot.com",
  messagingSenderId: "949736203523",
  appId: "1:949736203523:web:675ac2113e3d99a9b6f536",
  measurementId: "G-RKQ5PTBW6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();