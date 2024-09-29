import * as Location from 'expo-location';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore configuration
import {getAuth}from 'firebase/auth';
const EnableConnections = async (firebaseUsername: string) => {
  // Request location permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    return;
  }

  // Check if location services are enabled
  const isLocationEnabled = await Location.hasServicesEnabledAsync();
  
  if (!isLocationEnabled) {
    return;
  }

  // Get the user's current location
  const location = await Location.getCurrentPositionAsync({});

  try {
    // Prepare user data to store in Firestore
    const firestoreUserData = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      status: 1
    };
    const id = String(getAuth().currentUser?.uid)
    // Set the user data in Firestore under the 'users' collection using their username
    const userDocRef = doc(db, 'users', id);
    await updateDoc(userDocRef, firestoreUserData); // This will create a new document or overwrite if it exists
  } catch (error) {
    console.error('Error posting location to Firestore:', error);
  }

  return {
    location,
  };
};

const DisableConnections = async (disconnect: any, removeListener: any) => {
  try {
    // Prepare user data to store in Firestore
    const firestoreUserData = {
      status: 0
    };
    const id = String(getAuth().currentUser?.uid)
    // Set the user data in Firestore under the 'users' collection using their username
    const userDocRef = doc(db, 'users', id);
    await updateDoc(userDocRef, firestoreUserData); // This will create a new document or overwrite if it exists
  } catch (error) {
    console.error('Error posting location to Firestore:', error);
  }

  // No unpublish or unsubscribe needed for location
  if (disconnect) {
    await disconnect();
  }
  if (removeListener) {
    removeListener(); // Call the listener removal
  }
};

export { EnableConnections, DisableConnections };
