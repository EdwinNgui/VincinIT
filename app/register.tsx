import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';

const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: schoolName,
        });

        // Update additional user information in Firestore
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          email: email,
          schoolName: schoolName,
          year: year,
          major: major,
          location:{},
        });
      }
      router.push("./(tabs)/connect");
    } catch (error: any) {
      Alert.alert('Registration failed', error.message); // Updated to use error.message
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust the offset if necessary
    >
      <Text style={styles.title}>
        VelocIT
        <Text style={styles.period}>.</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="School Name"
        value={schoolName}
        onChangeText={setSchoolName}
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        placeholderTextColor="#b5b5b5"
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={major}
        onChangeText={setMajor}
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
    width: '80%', // Changed to 100% to align with input width
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
