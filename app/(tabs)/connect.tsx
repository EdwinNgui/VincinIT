import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch, SafeAreaView, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { EnableConnections, DisableConnections } from '@/components/ToggleOnline'; // Adjust import path accordingly

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [connectionState, setConnectionState] = useState<any>({});

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
        const { disconnect, unsubscribe, unpublish,removeListener } = connectionState;
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
          <Text style={styles.name}>{getAuth().currentUser?.email}</Text>
          <Text style={styles.title}>
            {getAuth().currentUser?.displayName || 'No Display Name'}
          </Text>
        </View>

        {/* Company Cards in the middle */}
        <View style={styles.cardContainer}>
          {['Apple, Inc.', 'Google, Inc.', 'Microsoft, Inc.', 'Tesla, Inc.'].map((company, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.companyName}>{company}</Text>
              <Text style={styles.companyDescription}>
                {`${company} is a key leader in this and that, making innovative technology.`}
              </Text>
              {index === 0 && <Text style={styles.recommended}>Recommended</Text>}
            </View>
          ))}
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
