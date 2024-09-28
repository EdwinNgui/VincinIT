import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import app from './realmConfig';
import Realm from 'realm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Authenticate the user
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
      alert("Logged in successfully!");
      // You can handle post-login actions such as navigation here
    } catch (err) {
      setError("Error");
    }
  };

  return (
    <View>
      <Text>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
