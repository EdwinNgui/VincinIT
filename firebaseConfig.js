// firebaseConfig.js
import { initializeApp } from 'firebase/app';
// import { getAuth,setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import { setLogLevel as setFirestoreLogLevel } from "firebase/firestore";
import { initializeAuth} from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Firebase configuration

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApikey, // Ensure this is set in app.json or app.config.js
  authDomain: 'vicinit-4d1aa.firebaseapp.com',
  projectId: 'vicinit-4d1aa',
  storageBucket: 'vicinit-4d1aa.appspot.com',
  messagingSenderId: '1098386176973',
  appId: '1:1098386176973:ios:682d7eba12441064daa284',
};
setFirestoreLogLevel('error');
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app,AsyncStorage)
// Initialize Firestores
const db = getFirestore(app)
 // This will suppress all warnings and only show errors.
console.log("Firestore Database Reference:", db);
export { auth, db };
