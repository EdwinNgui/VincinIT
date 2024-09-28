import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // Handlers for button presses
  const handleSignInPress = () => {
    Alert.alert("Sign In button pressed", "Functionality can be added here.");
  };

  const handleCreateAccountPress = () => {
    Alert.alert("Create Account button pressed", "Functionality can be added here.");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sign In</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Step 1 - Les~ Buttons */}
      <ThemedView style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignInPress} />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button title="Create an Account" onPress={handleCreateAccountPress} />
      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    margin: 16, // Adds some margin around the buttons
  },
});
