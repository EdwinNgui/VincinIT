import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("./(tabs)/connect");
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this value as needed
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
    paddingHorizontal: 20, // Added padding for better layout on small screens
  },
  period: {
    color: "#8f179f",
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 40, // Adjusted margin for better spacing
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
    width: '100%', // Changed to 100% to make use of the container width
    backgroundColor: '#d0d0d0',
  },
  loginButton: {
    width: '100%', // Changed to 100% to align with input width
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
