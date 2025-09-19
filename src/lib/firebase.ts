
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-238336437-7014a",
  "appId": "1:552603188750:web:3bea331a17b837fec0c65f",
  "apiKey": "AIzaSyByrUUW_Xs0vzIWHT54y7QwFV_FLpa6ttI",
  "authDomain": "studio-238336437-7014a.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "552603188750"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
