import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKqz0P2b6dEXU52ooXjQYH1IJDMix4xrg",
  authDomain: "choose-nature-live-better.firebaseapp.com",
  projectId: "choose-nature-live-better",
  storageBucket: "choose-nature-live-better.firebasestorage.app",
  messagingSenderId: "649020386290",
  appId: "1:649020386290:web:f61a7474ff0d0870c5d96b"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
