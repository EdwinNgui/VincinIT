import React, { useMemo, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore configuration
import { getAuth } from 'firebase/auth';

const EnableConnections = async (firebaseUsername: any) => {
  // Request location permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Location permission not granted');
    return;
  }

  // Check if location services are enabled
  const isLocationEnabled = await Location.hasServicesEnabledAsync();
  if (!isLocationEnabled) {
    console.error('Location services are not enabled');
    return;
  }

  // Get the user's current location
  const location = await Location.getCurrentPositionAsync({});
  console.log(`Current location: ${location.coords.latitude}, ${location.coords.longitude}`);
  try {
    const userDocRef = doc(db, 'users', firebaseUsername);
    await setDoc(userDocRef, {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      timestamp: new Date(),
    }, { merge: true });
    console.log('Current location posted to Firestore successfully.');
  } catch (error) {
    console.error('Error posting location to Firestore:', error);
  }
  return {
    // No disconnect, unpublish, or unsubscribe needed for location
    location, 
  };
};

const DisableConnections = async (disconnect: any, unsubscribe: any, unpublish: any, removeListener: any) => {
  // No unpublish or unsubscribe needed for location
  if (disconnect) await disconnect();
  if (removeListener) removeListener(); // Call the listener removal
};

export { EnableConnections, DisableConnections };
