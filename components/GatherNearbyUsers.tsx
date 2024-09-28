import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNearbySubscription } from 'react-native-google-nearby-messages';
import Constants from 'expo-constants';

const NearbyStrings = () => {
  // Create a memoized NearbyConfig object
  const nearbyConfig = useMemo(() => ({
    apiKey: Constants?.expoConfig?.extra?.nearbyApikey,
  }), []);

  // Use the useNearbySubscription hook to subscribe to nearby messages
  const { nearbyMessages, nearbyStatus } = useNearbySubscription(nearbyConfig);

  // Render loading or error state if applicable
  if (nearbyStatus === 'connecting') {
    return <Text style={styles.statusText}>Connecting...</Text>;
  }

  if (nearbyStatus === 'error') {
    return <Text style={styles.statusText}>Error occurred while connecting.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Messages:</Text>
      <FlatList
        data={nearbyMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.messageText}>{item}</Text>
        )}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    marginVertical: 5,
  },
  statusText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default NearbyStrings;
