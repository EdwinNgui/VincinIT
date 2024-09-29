// UserProfileScreen.jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, ScrollView, View, Image, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import groq from '../../groqConfig'; // Adjust the import path based on your project structure

export default function UserProfileScreen() {
  const [aiDescription, setAiDescription] = useState(''); // State for AI-generated description
  const [interests, setInterests] = useState(['Robotics', 'Money', 'Bread', 'Dough']); // Mutable list of interests
  const [major, setMajor] = useState('Electrical Engineering'); // User's major
  const [school, setSchool] = useState('University of Michigan'); // User's school
  const [flavorText, setFlavorText] = useState('Software Engineer, Ex. Apple, Ex. Netflix'); // User's custom description or flavor text

  useEffect(() => {
    // Call the main function when the component loads
    main();
  }, [interests, major, school, flavorText]); // Trigger main() if any of these values change

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
    const interestsString = interests.join(', '); // Create a comma-separated string of interests
    return groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Give a description of this user. Their interests include: ${interestsString}. They are majoring in ${major}, attending ${school}. Additional details: ${flavorText}. Limit to 3-4 sentences.`,
        },
      ],
      model: "llama-3.1-70b-versatile",
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title inside the main container */}
      <ThemedText type="title" style={styles.appName}>
        VelocIT
        <Text style={styles.period}>.</Text>
      </ThemedText>

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
          {flavorText}
        </ThemedText>
      </ThemedView>

      {/* Profile Details Card */}
      <ThemedView style={styles.detailsCard}>
        <ThemedText type="subtitle" style={styles.darkText}>
          Profile Details
        </ThemedText>
        <ThemedText style={styles.darkText}>
          {school}
        </ThemedText>
        <ThemedText style={styles.darkText}>
          Major: {major}
        </ThemedText>
        <ThemedText style={styles.darkText}>Graduation Year</ThemedText>

        <ThemedText
          type="subtitle"
          style={[styles.interestsTitle, styles.darkText]}
        >
          Interests
        </ThemedText>
        <View style={styles.interestsContainer}>
          {/* Render interests dynamically */}
          {interests.map((interest, index) => (
            <ThemedText key={index} style={styles.interestItem}>
              {interest}
            </ThemedText>
          ))}
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
    backgroundColor: '#6a0dad', // Full purple background matching the previous header
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 24, // Adjust padding to make room for status bar
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20 // Spacing after the title
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
    margin: 24,
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
    backgroundColor: '#C292E6', // Light purple background for detail cards
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 16,
    
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
  period: {
    color: "#000",
  },
});
