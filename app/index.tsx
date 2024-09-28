import { Image, StyleSheet, Button, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // Handlers for button presses
  const router = useRouter();
  const handleSignInPress = () => {
    router.push("/login");
  };

  const handleCreateAccountPress = () => {
    router.push("/register");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sign In</ThemedText>
      </ThemedView>

      {/* Display Logo */}

      {/* Buttons with updated styles */}
      <ThemedView style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignInPress} color="#007AFF" />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button title="Create an Account" onPress={handleCreateAccountPress} color="#007AFF" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#000', // Background color set to white
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20, // Space between title and logo
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 20, // Space between logo and buttons
  },
  buttonContainer: {
    width: '80%',
    margin: 10, // Space between buttons
    backgroundColor: '#fff', // Background stays white
    borderRadius: 8, // Curved corners for the button containers
    overflow: 'hidden', // Ensures buttons inside follow rounded corners
  },
});


//HELLO