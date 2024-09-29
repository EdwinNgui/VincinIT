import React, { useMemo, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

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

  // You can add your custom logic here, e.g., publish location or connect to a server

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
