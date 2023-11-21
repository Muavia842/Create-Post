import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyDdR6IYJzqPrxzPv0-_728YkENHyq5uReg',
  authDomain: 'blogproject-c5922.firebaseapp.com',
  projectId: 'blogproject-c5922',
  storageBucket: 'blogproject-c5922.appspot.com',
  messagingSenderId: '323733157516',
  appId: '1:323733157516:web:4e87aa1700653fa947ada9',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
