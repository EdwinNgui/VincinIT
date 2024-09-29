import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch, SafeAreaView, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { EnableConnections, DisableConnections } from '@/components/ToggleOnline'; // Adjust import path accordingly
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

interface UserLocation {
  id: string; // User document ID
  email: string | null; // User email, which can be null if not available
  location: {
    latitude: number; // Latitude of the user's location
    longitude: number; // Longitude of the user's location
  } | null; // Location can be null if not available
}

// Function to fetch all nearby users within 0.2 miles
const getAllNearbyUsers = async (desiredLocation: { latitude: number; longitude: number }): Promise<UserLocation[]> => {
  const usersCollectionRef = collection(db, "users"); // Reference to the users collection
  const userLocations: UserLocation[] = []; // Array to hold user location data

  try {
    const querySnapshot = await getDocs(usersCollectionRef);
    const currentUserEmail = getAuth().currentUser?.email;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === currentUserEmail && data.location) {
        // If the user is the current user, store their location
        const currentUserLocation = data.location;

        // Check distance for other users
        querySnapshot.forEach((doc) => {
          const otherData = doc.data();
          if (otherData.location) {
            const h_distance = currentUserLocation.latitude - otherData.location.latitude;
            const v_distance = currentUserLocation.longitude - otherData.location.longitude;
            if (Math.sqrt(h_distance ** 2 + v_distance ** 2) <= 0.2) { // Check if within 0.2 miles
              userLocations.push({
                id: doc.id,
                email: otherData.email || null, // Ensure email is null if not present
                location: {
                  latitude: otherData.location.latitude,
                  longitude: otherData.location.longitude,
                },
              });
            }
          }
        });
      }
    });
    return userLocations; // Return array of nearby user locations
  } catch (error) {
    console.error("Error fetching nearby user locations: ", error);
    return []; // Return an empty array on error
  }
};
const getUserDetails = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          email: userData.email,
          location: userData.location,
          schoolName: userData.schoolName,
          year: userData.year,
          major: userData.major,
        };
      } else {
        console.error("No user document found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user document: ", error);
      if (error=== 'permission-denied') {
        Alert.alert("Permission Denied", "You do not have access to this document.");
      } else {
        Alert.alert("Error", "An error occurred while fetching user details.");
      }
    }
  } else {
    console.error("No user is currently signed in.");
    return null;
  }
};


export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [connectionState, setConnectionState] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>(null); // State to hold user details
  const [nearbyUsers, setNearbyUsers] = useState<UserLocation[]>([]); // State to hold nearby users

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = await getUserDetails();
      setUserDetails(details);
    };

    const fetchNearbyUsers = async () => {
      if (userDetails?.location) {
        const users = await getAllNearbyUsers(userDetails.location); // Pass the user's location
        setNearbyUsers(users);
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    // Fetch nearby users whenever userDetails changes
    const fetchNearbyUsers = async () => {
      if (userDetails?.location) {
        const users = await getAllNearbyUsers(userDetails.location); // Pass the user's location
        setNearbyUsers(users);
      }
    };

    fetchNearbyUsers();
  }, [userDetails]);

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
        const { disconnect, unsubscribe, unpublish, removeListener } = connectionState;
        await DisableConnections(disconnect, unsubscribe, unpublish, removeListener);
        console.log('Listener removed');
        setConnectionState({});
      } catch (error) {
        Alert.alert('Error', 'Failed to disable connections');
      }
    }
  };

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
        {/* Company Cards in the middle */}
        <View style={styles.cardContainer}>
          {nearbyUsers.length > 0 ? (
            nearbyUsers.map((user) => (
              <View key={user.id} style={styles.card}>
                <Text style={styles.companyName}>{user.email || 'No Email'}</Text>
                <Text style={styles.companyDescription}>
                  {`Location: ${user.location?.latitude}, ${user.location?.longitude}`}
                </Text>
              </View>
            ))
          ) : (
            <Text>No nearby users found.</Text>
          )}
        </View>

        {/* Online Status Toggle */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: '#8E24AA', // Purple color
    borderRadius: 20, // Rounded corners on both the top and bottom
    paddingTop: 40, // Added padding for devices with a notch
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#E1BEE7',
  },
  cardContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  companyDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  recommended: {
    marginTop: 8,
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  }
});
