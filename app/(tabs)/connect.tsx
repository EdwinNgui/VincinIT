import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EnableConnections, DisableConnections } from '@/components/ToggleOnline';

export default function TabTwoScreen() {
  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = async () => {
    if (isOnline) {
      // Disable connections
      await DisableConnections();
      setIsOnline(false);
    } else {
      // Enable connections
      await EnableConnections();
      setIsOnline(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleStatus} style={styles.button}>
        <Text style={styles.buttonText}>
          {isOnline ? 'Go Offline' : 'Go Online'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.statusText}>
        Status: {isOnline ? 'Online' : 'Offline'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusText: {
    marginTop: 20,
    fontSize: 18,
  },
});
