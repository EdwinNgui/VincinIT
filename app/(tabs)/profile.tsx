// UserProfileScreen.jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, ScrollView, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import groq from '../../groqConfig'; // Adjust the import path based on your project structure

export default function UserProfileScreen() {
  const [aiDescription, setAiDescription] = useState(''); // State for AI-generated description

  useEffect(() => {
    // Call the main function when the component loads
    main();
  }, []);

  async function main() {
    try {
      const chatCompletion = await getGroqChatCompletion();
      // Set the AI description in state
      setAiDescription(chatCompletion.choices[0]?.message?.content || ''); 
    } catch (error) {
      console.error('Error fetching Groq response:', error);
    }
  }

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Give a description of this user based on their interests: Robotics, Money, Bread, Dough. Limit to 2-3 Sentences.',
        },
      ],
      model: "llama-3.1-70b-versatile",
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.appName}>
          VelocIT
        </ThemedText>
      </ThemedView>

      {/* Profile Card */}
      <ThemedView style={styles.profileCard}>
        <ThemedText type="title" style={styles.darkText}>
          Hi Jonathan Dunne,
        </ThemedText>

        <Image
          source={require('@/assets/images/jonnie-modified.png')} // Replace with your image path
          style={styles.reactLogo}
          resizeMode="contain" // Maintain aspect ratio
        />

        <ThemedText style={[styles.openingLine, styles.darkText]}>
          "Software Engineer, Ex. Apple, Ex. Netflix"
        </ThemedText>
      </ThemedView>

      {/* Profile Details Card */}
      <ThemedView style={styles.detailsCard}>
        <ThemedText type="subtitle" style={styles.darkText}>
          Profile Details
        </ThemedText>
        <ThemedText style={styles.darkText}>
          Student at University of Michigan
        </ThemedText>
        <ThemedText style={styles.darkText}>Electrical Engineering</ThemedText>
        <ThemedText style={styles.darkText}>Graduation Year</ThemedText>

        <ThemedText
          type="subtitle"
          style={[styles.interestsTitle, styles.darkText]}
        >
          Interests
        </ThemedText>
        <View style={styles.interestsContainer}>
          <ThemedText style={styles.interestItem}>Robotics</ThemedText>
          <ThemedText style={styles.interestItem}>Money</ThemedText>
          <ThemedText style={styles.interestItem}>Bread</ThemedText>
          <ThemedText style={styles.interestItem}>Dough</ThemedText>
        </View>
      </ThemedView>

      {/* AI Gen Card Block */}
      <ThemedView style={styles.detailsCard}>
        <ThemedText type="subtitle" style={styles.darkText}>
          AI Profile Summary
        </ThemedText>
        
        {/* Display the AI-generated description here */}
        <ThemedText style={styles.darkText}>
          {aiDescription || 'Fetching AI-generated description...'}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16, // To allow smooth scrolling past the last element
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24, // Adjusted gap for iPhone 12 (or similar devices)
    paddingBottom: 10,
    backgroundColor: '#6a0dad',
    alignItems: 'center',
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginTop: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  openingLine: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    marginTop: 14,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#C292E6',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  interestsTitle: {
    marginTop: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderRadius: 16,
  },
  interestItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    margin: 4,
    overflow: 'hidden', // Ensures buttons inside follow rounded corners
    color: '#222',
  },
  darkText: {
    color: '#222', // Darker text color for better readability
    marginVertical: 4,
  },
});
