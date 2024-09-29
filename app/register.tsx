import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import * as Location from 'expo-location'; // Importing Expo Location

const RegisterScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    schoolName: '',
    year: '',
    major: '',
    lat: 0,
    long: 0
  });

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { email, password, schoolName, year, major } = userData;

    // Basic validation
    if (!email || !password || !schoolName || !year || !major) {
      Alert.alert('All fields are required!');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the newly created user

      // Update the user's profile with the school name
      await updateProfile(user, { displayName: schoolName });

      // Get user location
      const { status } = await Location.requestForegroundPermissionsAsync();
      let lat = 0;
      let long = 0;

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        lat = location.coords.latitude;
        long = location.coords.longitude;
      } else {
        Alert.alert('Location permission not granted, using default values.');
        lat = 0;
        long = 0; // Use default values or handle as needed
      }

      // Prepare user data to store in Firestore
      const firestoreUserData = {
        email: email,
        schoolName: schoolName,
        year: year,
        major: major,
        latitude:lat,
        longitude:long
      };
      console.log("")
      // Set the user data in Firestore under the 'users' collection using their UID
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, firestoreUserData); // This will create a new document or overwrite if it exists

      // Navigate to the next screen after successful registration
      router.push("./(tabs)/connect");
    } catch (error: any) {
      Alert.alert('Registration failed', error.message);
      console.error('Registration error:', error); // Log the error for debugging
    }

    console.log("Firestore Database Reference:", db);
    console.log("User Data to Write:", userData);

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
      <TextInput
        style={styles.input}
        placeholder="School Name"
        value={userData.schoolName}
        onChangeText={(value) => handleInputChange('schoolName', value)}
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={userData.year}
        onChangeText={(value) => handleInputChange('year', value)}
        keyboardType="numeric"
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={userData.major}
        onChangeText={(value) => handleInputChange('major', value)}
        placeholderTextColor="#b5b5b5"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    height: 40,
    width: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#d0d0d0',
  },
  loginButton: {
    width: '80%',
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

export default RegisterScreen;
