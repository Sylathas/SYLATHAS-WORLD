import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxkh6FQTgI1EZtsCf0BQyto7Z_qmHdc5A",
    authDomain: "sylathas-world.firebaseapp.com",
    projectId: "sylathas-world",
    storageBucket: "sylathas-world.appspot.com",
    messagingSenderId: "698403477975",
    appId: "1:698403477975:web:778d9bbe151df5d8f91392"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
