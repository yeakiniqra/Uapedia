import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const events = require('../scripts/events.json');

interface Event {
  link: string;
  image: string;
  date: string;
}
const Events = () => {

  const handlePress = (link: string) => {
    Linking.openURL(link);
};

const [loaded] = useFonts({
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-medium': require('../assets/fonts/Poppins-SemiBold.ttf'),
});

if (!loaded) {
  return null;
}

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.header}>Events & Notices</Text>
    {events.map((event: Event, index: number) => (
      <Pressable key={index} onPress={() => handlePress('https://cse.uap-bd.edu/noticeboard/notice/')} style={styles.eventContainer}>
        <Image source={{ uri: `https://cse.uap-bd.edu${event.image}` }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <Text style={styles.eventDate}>Published Date: {event.date}</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="white" />
        </View>
      </Pressable>
    ))}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-medium',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#2a3887',
    borderRadius: 10,
    padding: 10,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 16,
    marginRight: 10,
    color: 'white',
  },
});

export default Events;
