import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Make sure you import Firestore

const LoginScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    schoolName: '',
    year: '',
    major: ''
  });

  // Use useEffect to load previously saved credentials
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedPassword = await AsyncStorage.getItem('userPassword');

        if (savedEmail) setUserData(prev => ({ ...prev, email: savedEmail }));
        if (savedPassword) setUserData(prev => ({ ...prev, password: savedPassword }));
      } catch (error) {
        console.error('Failed to load credentials:', error);
      }
    };

    loadCredentials();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = userData;

    // Basic validation
    if (!email || !password) {
      Alert.alert('Email and password are required!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save credentials for future use
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);

      // Retrieve the user document from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userDataFromFirestore = userDoc.data();
        setUserData(prev => ({
          ...prev,
          schoolName: userDataFromFirestore.schoolName || '',
          year: userDataFromFirestore.year || '',
          major: userDataFromFirestore.major || ''
        }));
      } else {
        console.log("No such document!");
      }

      // Optionally update user data in Firestore if fields have been changed
      await updateDoc(userDocRef, {
        // Here you can set the fields you want to update
        schoolName: userData.schoolName,
        year: userData.year,
        major: userData.major
      });

      router.push("./(tabs)/connect");
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <Text style={styles.title}>
        VelocIT
        <Text style={styles.period}>.</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
        placeholderTextColor="#b5b5b5"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  period: {
    color: "#8f179f",
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 54,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#d0d0d0',
  },
  loginButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#8f179f',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
