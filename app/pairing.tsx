// src/screens/PairingScreen.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import groq from '../groqConfig'; // Adjust the import path based on your project structure

const PairingScreen: React.FC = () => {
  const [quote, setQuote] = useState(''); // Use state to hold the quote
  const router = useRouter();

  const handleExitPress = () => {
    router.push("./(tabs)/connect"); // Navigates back to the previous screen
  };

  async function getGroqChatCompletion() {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Make a creative conversation starter suggestion related to a professional environment. Keep it to one sentence max.`,
        },
      ],
      model: "llama-3.1-70b-versatile",
    });

    // Update the quote state with the response
    setQuote(response.choices[0].message.content); // Assuming the response structure is as mentioned
  }

  // Call the function to set the quote when the component mounts
  useEffect(() => {
    getGroqChatCompletion();
  }, []); // Empty dependency array to run once on mount

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo Section */}
        <Text style={styles.logo}>
          VelocIT
          <Text style={styles.period}>.</Text>
        </Text>

        {/* Quote Section */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            {quote || "Loading..."} {/* Display loading message while waiting for the quote */}
          </Text>
        </View>

        {/* Exit Button */}
        <TouchableOpacity style={styles.exitButton} onPress={handleExitPress}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PairingScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f0f0f0', // Light gray background for a softer feel
    paddingHorizontal: 20, // Better padding for different screen sizes
    paddingVertical: 30, // Ensure content isn't cut off
  },
  logo: {
    fontSize: 48, // Slightly smaller font size to avoid being cut off
    fontWeight: 'bold',
    marginBottom: 40, // Spacing between logo and quote
    color: '#000000', // Black color for logo text
    textAlign: 'center',
  },
  period: {
    color: '#8f179f', // Purple color for the period
  },
  quoteContainer: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  quoteText: {
    fontSize: 20, // Slightly smaller font for easier readability
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555555', // Softer gray for the quote text
    lineHeight: 28, // Better line height for quote readability
  },
  exitButton: {
    backgroundColor: 'transparent', // Transparent background for outlined style
    borderColor: '#8f179f', // Purple border color
    borderWidth: 2, // Width of the border
    paddingVertical: 12,
    paddingHorizontal: 50, // Wider padding for a larger tap target
    borderRadius: 30, // More rounded button for a modern look
    elevation: 0, // No elevation for outlined button
    marginTop: 280,
  },
  exitButtonText: {
    color: '#8f179f', // Purple text color for the button
    fontSize: 18,
    fontWeight: '600', // Slightly less bold for a softer feel
    textAlign: 'center', // Center text inside the button
  },
});
