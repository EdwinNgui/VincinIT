import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useState} from 'react';
import { StyleSheet, Image, Platform,View, Text, Alert, TouchableOpacity  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import {EnableConnections,DisableConnections} from '@/components/ToggleOnline'

export default function TabTwoScreen() {
  const[isOnline,setIsOnline]=useState(true);
  return (
      <View>
        <TouchableOpacity>
           <Text>Toggle Status</Text>
        </TouchableOpacity>
      </View>
  );
}
