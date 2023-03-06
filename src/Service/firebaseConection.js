import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCqt-eb8JQ2LaLHUaJbINazSOGu4yLJjF4",
  authDomain: "chamado-67f71.firebaseapp.com",
  projectId: "chamado-67f71",
  storageBucket: "chamado-67f71.appspot.com",
  messagingSenderId: "424143159895",
  appId: "1:424143159895:web:2def4eeac4e1108e4b5912",
  measurementId: "G-1T27ZYV4P5"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export  { auth, db, storage };