import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch, SafeAreaView, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { EnableConnections, DisableConnections } from '@/components/ToggleOnline'; // Adjust import path accordingly
import { collection, doc, getDocs } from "firebase/firestore";
import * as Location from 'expo-location';

// Function to calculate distance between two coordinates
const getDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [connectionState, setConnectionState] = useState<any>({});
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]); // State to store nearby users

  const toggleOnlineStatus = async () => {
    const userEmail = getAuth().currentUser?.email;

    if (!userEmail) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setIsOnline((prev) => !prev); // Toggle online status

    if (!isOnline) {
      try {
        // Enable online status
        const connection = await EnableConnections(userEmail);
        setConnectionState(connection);
      } catch (error) {
        Alert.alert('Error', 'Failed to enable connections');
        setIsOnline(false); // Reset online status in case of error
      }
    } else {
      try {
        // Disable online status
        const { disconnect, unsubscribe } = connectionState;
        await DisableConnections(disconnect, unsubscribe);
        console.log('Listener removed');
        setConnectionState({});
      } catch (error) {
        Alert.alert('Error', 'Failed to disable connections');
      }
    }
  };

  // Fetch nearby users within 0.2 miles
  const fetchNearbyUsers = async () => {
    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      const currentLat = userLocation.coords.latitude;
      const currentLon = userLocation.coords.longitude;

      console.log(`Current location: Latitude: ${currentLat}, Longitude: ${currentLon}`);

      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users: any[] = [];

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        const userLat = userData.latitude;
        const userLon = userData.longitude;

        // Calculate distance to each user
        const distance = getDistance(currentLat, currentLon, userLat, userLon);
        if (distance <= 0.2 && userData.status && userData.email !== getAuth().currentUser?.email) { // Check if within 0.2 miles and online
          users.push({ id: doc.id,...userData, distance });
        }
      });

      setNearbyUsers(users); // Update state with nearby users
      console.log('Nearby users:', users);
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  useEffect(() => {
    fetchNearbyUsers(); // Fetch users when the component mounts
    
    const intervalId = setInterval(() => {
      fetchNearbyUsers(); // Fetch users every 5 seconds
    }, 5000); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* VelocIT Title */}
        <Text style={styles.pageTitle}>VelocIT</Text>

        {/* Top Section - Profile Text with Rounded Corners */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>{getAuth().currentUser?.email || 'No Email'}</Text>
          <Text style={styles.title}>
            {getAuth().currentUser?.displayName || 'No School Listed'}
          </Text>
        </View>
        
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Online Status:</Text>
          <Switch 
            value={isOnline} 
            onValueChange={toggleOnlineStatus} 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isOnline ? "#f5dd4b" : "#f4f3f4"}
          />
          <Text style={styles.statusText}>{isOnline ? "Online" : "Offline"}</Text>
        </View>

        {/* Display nearby users */}
        <View style={styles.nearbyUsersContainer}>
          <Text style={styles.nearbyUsersTitle}>Nearby Users:</Text>
          {nearbyUsers.length === 0 ? (
            <Text style={styles.noUsersText}>No nearby users found.</Text>
          ) : (
            nearbyUsers.map(user => (
              <View key={user.id} style={styles.userCard}>
                <Text style={styles.userName}>{user.email}</Text>
                <Text style={styles.userName}>{user.schoolName}</Text>
                <Text style={styles.userDistance}>{user.distance.toFixed(3)} miles away</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6a0dad', // Deep purple background
  },
  scrollContainer: {
    paddingBottom: 16, // Ensures that the content can scroll beyond the last item
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 44, // Pushes the title 44px from the top
    marginBottom: 16, // Space between title and profile section
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff', // Purple color
    borderRadius: 20, // Rounded corners on both the top and bottom
    paddingTop: 40, // Added padding for devices with a notch
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
    marginRight: 36
  },
  name: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#E1BEE7',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the items in the toggle container
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  nearbyUsersContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  nearbyUsersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  userCard: {
    backgroundColor: '#4A148C',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  userDistance: {
    color: '#E1BEE7',
    fontSize: 14,
  },
  noUsersText: {
    color: '#fff',
    fontSize: 16,
  },
});
