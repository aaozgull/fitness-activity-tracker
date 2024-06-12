// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDV0FyeJaFvzL19ZlO3safrfg0A0lAmixI",
    authDomain: "fitness-app-e4b0a.firebaseapp.com",
    projectId: "fitness-app-e4b0a",
    storageBucket: "fitness-app-e4b0a.appspot.com",
    messagingSenderId: "310769362053",
    appId: "1:310769362053:web:d1c15ccda57deea949f5ec",
    measurementId: "G-MFT1P333FF",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
