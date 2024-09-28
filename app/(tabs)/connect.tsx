import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { EnableConnections, DisableConnections } from '@/components/ToggleOnline';

export default function TabTwoScreen() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Section - Profile Text */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>Danny Devito</Text>
          <Text style={styles.title}>Principle Talent Acquisition</Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#8E24AA',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40, // Added padding for devices with a notch
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
