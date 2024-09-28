// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCCGMBC_nSw1oTO33If4rCAFS8Z54yrTMA',
  authDomain: 'vicinit-4d1aa.firebaseapp.com',
  projectId: 'vicinit-4d1aa',
  storageBucket: 'vicinit-4d1aa.appspot.com',
  messagingSenderId: '1098386176973',
  appId: '1:1098386176973:ios:682d7eba12441064daa284',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
