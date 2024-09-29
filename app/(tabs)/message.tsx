import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import groq from '../../groqConfig'; // Adjust the import path based on your project structure

export default function HomeScreen() {
  const [aiDescription, setAiDescription] = useState(''); // State for AI-generated description
  const [companies, setCompanies] = useState([
    { name: 'Facebook: AI Training Intern', note: '' },
    { name: 'Apple: Software Engineer Intern', note: '' },
    { name: 'Amazon: Marketing Engineer Intern', note: '' },
    { name: 'Netflix: User Experience Engineer', note: '' },
    { name: 'Google: Server DevOps Intern', note: '' }
  ]);

  useEffect(() => {
    main();
  }, [companies]); // Trigger main() if companies change

  async function main() {
    try {
      const chatCompletion = await getGroqChatCompletion();
      setAiDescription(chatCompletion.choices[0]?.message?.content || ''); 
    } catch (error) {
      console.error('Error fetching Groq response:', error);
    }
  }

  async function getGroqChatCompletion() {
    const notes = companies.map(company => `${company.name} - Note: ${company.note}`).join(', '); // Include notes in the request
    return groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Provide a method for best outreach based on the companies listed. The user has worked or interacted with the following companies only at a career fair with recruiters: ${notes}. Mention company names in advice given: ${companies}. Limit to 5-6 sentences.`,
        },
      ],
      model: "llama-3.1-70b-versatile",
    });
  }

  // Function to update notes for a specific company
  const handleNoteChange = (text: string, index: number) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index].note = text;
    setCompanies(updatedCompanies);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* VelocIT Title */}
        <Text style={styles.pageTitle}>VelocIT</Text>

        {/* Company List with Notes */}
        {companies.map((company, index) => (
          <View key={index} style={styles.companyContainer}>
            <Text style={styles.companyName}>{company.name}</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Add a note..."
              value={company.note}
              onChangeText={(text) => handleNoteChange(text, index)}
              multiline
            />
          </View>
        ))}

        {/* Container for Generate Next Steps Button */}
        <View style={styles.buttonContainer}>
          <Button title="Generate Next Steps" onPress={main} />
        </View>

        {/* AI Generated Profile Summary */}
        <View style={styles.aiSummaryContainer}>
          <Text style={styles.aiSummaryTitle}>Recommended Next Steps</Text>
          <Text style={styles.aiSummaryText}>
            {aiDescription || 'Fetching AI-generated description...'}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 44,
    marginBottom: 16,
    color: '#fff',
  },
  companyContainer: {
    backgroundColor: '#8E24AA',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: '#E1BEE7', // Light purple color for input
    borderRadius: 8,
    padding: 10,
    color: '#000',
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#E1BEE7', // Same light purple color for the button container
    borderRadius: 16,
    width: '60%' ,
    padding: 16,
    marginHorizontal: 75,
    marginVertical: 16, // Space between the last company module and the button container
    alignItems: 'center', // Center the button horizontally
  },
  aiSummaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    marginHorizontal: 16,
    marginVertical: 8,
    marginTop: 32
  },
  aiSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  aiSummaryText: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
  },
});
