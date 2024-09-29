// src/screens/PairingScreen.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

const PairingScreen: React.FC = () => {
  const router = useRouter();

  const handleExitPress = () => {
    router.push("./(tabs)/connect"); // Navigates back to the previous screen
  };

  const quote = `"The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt`;

  return (
    <ThemedView style={styles.container}>
      {/* Logo Section */}
      <ThemedText style={styles.logo}>
        VelocIT
        <ThemedText style={styles.period}>.</ThemedText>
      </ThemedText>

      <ThemedView style={styles.quoteContainer}>
        <ThemedText style={styles.quoteText}>
            {quote}
        </ThemedText>
    </ThemedView>


      {/* Exit Button */}
      <TouchableOpacity style={styles.exitButton} onPress={handleExitPress}>
        <ThemedText style={styles.exitButtonText}>Exit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default PairingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#ffffff', // White background
    padding: 20,
  },
  logo: {
    fontSize: 54,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000', // Black color for logo text
  },
  period: {
    color: '#8f179f', // Purple color for the period
  },
  quoteContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  quoteText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333333', // Dark gray color for quote text
  },
  exitButton: {
    backgroundColor: '#8f179f', // Purple background
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  exitButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
});
