import { Image, StyleSheet, Button, Alert, Text } from 'react-native';
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
        <Text style={styles.logo}>
          VelocIT
          <Text style={styles.period}>
            .  
          </Text>
        </Text>
        
      <Image
        source={require('@/assets/images/authPageImg.png')} // Replace with your image path
        style={styles.reactLogo}
        resizeMode="contain" // Maintain aspect ratio
      />

      {/* Buttons with updated styles */}
      <ThemedView style={styles.registerContainer}>
        <Button title="Register Now" onPress={handleCreateAccountPress} color="#ffffff" />
      </ThemedView>
    
      <ThemedView style={styles.signInContainer}>
        <Button title="Sign In" onPress={handleSignInPress} color="#666565" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#ffffff', // Background color set to white
  },
  period:{
    color: "#8f179f",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20, // Space between title and logo
  },
  signInContainer: {
    width: '80%',
    marginTop: 10, // Space between buttons
    marginBottom: 30,
    paddingVertical: 10,
    backgroundColor: '#d8d6d6', // Background stays white
    borderRadius: 15, // Curved corners for the button containers
    overflow: 'hidden', // Ensures buttons inside follow rounded corners
    color: '#ffffff',
  },
  registerContainer:{
    width: '80%',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#8f179f', // Background stays white
    borderRadius: 15, // Curved corners for the button containers
    overflow: 'hidden', // Ensures buttons inside follow rounded corners
    marginTop: 200,
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginTop: 40,
  },
  buttonContainer: {
    width: '80%',
    margin: 10, // Space between buttons
    backgroundColor: '#fff', // Background stays white
    borderRadius: 8, // Curved corners for the button containers
    overflow: 'hidden', // Ensures buttons inside follow rounded corners
  },
  logo: {
    alignItems: 'center',
    fontSize: 54,
    marginBottom: 40,
    fontWeight: 'bold',
    marginTop: 80,
  },
});