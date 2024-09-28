// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Text } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { Redirect, useRouter } from 'expo-router';
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
        });
      }
      router.push("./(tabs)/connect")
    } catch (error:any) {
      Alert.alert('Registration failed', error.message); // Updated to use error.message
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="School Name"
          value={schoolName}
          onChangeText={setSchoolName}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Major"
          value={major}
          onChangeText={setMajor}
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default RegisterScreen;
