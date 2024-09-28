import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useState} from 'react';
import { StyleSheet, Image, Platform,View, Text, Alert, TouchableOpacity  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import {EnableConnections,DisableConnections} from '@/components/ToggleOnline'

export default function TabTwoScreen() {
  const[isOnline,setIsOnline]=useState(true);
  const toggleOnline= () =>
  {
    if (isOnline)
    {
      setIsOnline(false)
    }
    else
    {
      setIsOnline(true)
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity onPress={toggleOnline}>
           <Text>Toggle Status</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
