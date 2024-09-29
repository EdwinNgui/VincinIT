// src/config/groqConfig.js
import Groq from 'groq-sdk';
import Constants from 'expo-constants';

// Access the Groq API key from Expo's configuration
const groqApiKey =
  Constants.expoConfig?.extra?.groqApiKey ||
  Constants?.extra?.groqApiKey;

if (!groqApiKey) {
  console.error('Groq API Key is not defined. Please set GROQ_APIKEY in your .env file.');
}

// Initialize Groq with the API key
const groq = new Groq({ apiKey: groqApiKey });

export default groq;
