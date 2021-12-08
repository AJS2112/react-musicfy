// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4ZPCXTFh-KTrLSVnsSYJHpwvgOOjUNIw",
    authDomain: "musicfy-dbac4.firebaseapp.com",
    projectId: "musicfy-dbac4",
    storageBucket: "musicfy-dbac4.appspot.com",
    messagingSenderId: "246745380458",
    appId: "1:246745380458:web:48b03cbff589c1b256bc13"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;