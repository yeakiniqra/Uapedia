import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,Pressable, Linking, LayoutAnimation, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';


const faculties = require('../../scripts/faculties.json');

interface Faculty {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone: string;
  email: string;
}

const Faculty = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);


  const handlePress = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedId(expandedId === id ? null : id);
  };

  const [loaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-medium': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {faculties.map((faculty: Faculty, index: number) => (
        <Pressable key={index} onPress={() => handlePress(faculty.id)} style={styles.facultyContainer}>
          <View style={styles.basicInfo}>
            <Image source={{ uri: `https://cse.uap-bd.edu${faculty.image}` }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{faculty.name}</Text>
              <Text style={styles.designation}>{faculty.designation}</Text>
            </View>
          </View>
          {expandedId === faculty.id && (
            <View style={styles.additionalInfo}>
              <TouchableOpacity style={styles.contactInfo} onPress={() => Linking.openURL(`tel:${faculty.phone}`)}>
                <Ionicons name="call" size={20} color="black" />
                <Text style={styles.infoText}>{faculty.phone}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactInfo} onPress={() => Linking.openURL(`mailto:${faculty.email}`)}>
                <Ionicons name="mail" size={20} color="black" />
                <Text style={styles.infoText}>{faculty.email}</Text>
              </TouchableOpacity>
              <Text style={styles.detailsText}>DEPT. OF CSE</Text>
            </View>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  facultyContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  basicInfo: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
  },
  designation: {
    fontSize: 14,
    color: '#666',
  },
  additionalInfo: {
    backgroundColor: '#e0f7fa',
    padding: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  detailsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',

  },
});

export default Faculty;
