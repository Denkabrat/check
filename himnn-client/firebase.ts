import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBtRATG1drWI5Q3akp8JrMJznAMhTFab5Y",
    authDomain: "himnn-4bcb6.firebaseapp.com",
    projectId: "himnn-4bcb6",
    storageBucket: "himnn-4bcb6.appspot.com",
    messagingSenderId: "1054736200680",
    appId: "1:1054736200680:web:2814de89217a4d15a42a5d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };