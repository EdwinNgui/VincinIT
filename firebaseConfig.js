// firebaseConfig.js
import { initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApikey, // Ensure this is set in app.json or app.config.js
  authDomain: 'vicinit-4d1aa.firebaseapp.com',
  projectId: 'vicinit-4d1aa',
  storageBucket: 'vicinit-4d1aa.appspot.com',
  messagingSenderId: '1098386176973',
  appId: '1:1098386176973:ios:682d7eba12441064daa284',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app,{
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
initializeApp(firebaseConfig);

export { auth, db };
