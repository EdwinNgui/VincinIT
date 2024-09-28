import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import app from '../realmConfig';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /*const handleCreateAccount = async () => {
    try {
      // Register user with email/password
      //await app.emailPasswordAuth.registerUser({ email, password });
      alert("Account created successfully!");
    } catch (err) {
      setError("Error");
    }
  };*/

  return (
    <View>
      <Text>Create Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Create Account" onPress={handleCreateAccount} />
    </View>
  );
};

export default CreateAccount;
