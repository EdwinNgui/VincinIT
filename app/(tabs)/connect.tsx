import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { getAuth } from 'firebase/auth';

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* VelocIT Title */}
        <Text style={styles.pageTitle}>VelocIT</Text>

        {/* Top Section - Profile Text with Rounded Corners */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>{getAuth().currentUser?.email}</Text>
          <Text style={styles.title}>{getAuth().currentUser?.displayName}</Text>
        </View>

        {/* Company Cards in the middle */}
        <View style={styles.cardContainer}>
          {['Apple, Inc.', 'Apple, Inc.', 'Apple, Inc.', 'Apple, Inc.'].map((company, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.companyName}>{company}</Text>
              <Text style={styles.companyDescription}>
                Apple is a key leader in this and that so they are usually making pretty cool phones and stuff.
              </Text>
              {index === 0 && <Text style={styles.recommended}>Recommended</Text>}
            </View>
          ))}
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
});
