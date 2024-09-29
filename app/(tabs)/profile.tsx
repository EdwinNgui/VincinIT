import { StyleSheet, Platform, ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function UserProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.appName}>
          VelocIT
        </ThemedText>
      </ThemedView>

      {/* Profile Card */}
      <ThemedView style={styles.profileCard}>
        <ThemedText type="title" style={styles.darkText}>
          Hi John Smith,
        </ThemedText>
        <ThemedText style={[styles.openingLine, styles.darkText]}>
          "This is our opening line frfr"
        </ThemedText>
      </ThemedView>

      {/* Profile Details Card */}
      <ThemedView style={styles.detailsCard}>
        <ThemedText type="subtitle" style={styles.darkText}>Profile Details</ThemedText>
        <ThemedText style={styles.darkText}>Student at University of Michigan</ThemedText>
        <ThemedText style={styles.darkText}>Electrical Engineering</ThemedText>
        <ThemedText style={styles.darkText}>Graduation Year</ThemedText>

        <ThemedText type="subtitle" style={[styles.interestsTitle, styles.darkText]}>Interests</ThemedText>
        <View style={styles.interestsContainer}>
          <ThemedText style={styles.interestItem}>Robotics</ThemedText>
          <ThemedText style={styles.interestItem}>Money</ThemedText>
          <ThemedText style={styles.interestItem}>Bread</ThemedText>
          <ThemedText style={styles.interestItem}>Dough</ThemedText>
        </View>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16, // To allow smooth scrolling past the last element
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24, // Adjusted gap for iPhone 12 (or similar devices)
    paddingBottom: 10,
    backgroundColor: '#6a0dad',
    alignItems: 'center',
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  openingLine: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
  },
  detailsCard: {
    backgroundColor: '#C292E6',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  interestsTitle: {
    marginTop: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  interestItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
    color: '#222'
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#222', // Darker text color for better readability
  },
});
