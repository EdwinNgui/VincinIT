import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch, SafeAreaView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

// Function to fetch user details using auth token
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
      return null;
    }
  } else {
    console.error("No user is currently signed in.");
    return null;
  }
};

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);

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

        {/* Online Status Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Online Status:</Text>
          <Switch 
            value={isOnline} 
            onValueChange={() => setIsOnline(prev => !prev)} 
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});
