import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, Pressable, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import faculties from '../../scripts/faculties.json';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone: string;
  email: string;
}

const Emergency = () => {
  const [selectedAdvisors, setSelectedAdvisors] = useState<Faculty[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadAdvisors = async () => {
      try {
        const savedAdvisors = await AsyncStorage.getItem('selectedAdvisors');
        if (savedAdvisors) {
          setSelectedAdvisors(JSON.parse(savedAdvisors));
        }
      } catch (error) {
        console.error('Failed to load advisors:', error);
      }
    };

    loadAdvisors();
  }, []);

  useEffect(() => {
    const saveAdvisors = async () => {
      try {
        await AsyncStorage.setItem('selectedAdvisors', JSON.stringify(selectedAdvisors));
      } catch (error) {
        console.error('Failed to save advisors:', error);
      }
    };

    saveAdvisors();
  }, [selectedAdvisors]);

  const addAdvisor = (advisor: Faculty) => {
    setSelectedAdvisors([...selectedAdvisors, advisor]);
    setModalVisible(false);
  };

  const removeAdvisor = (advisorIndex: number) => {
    setSelectedAdvisors(selectedAdvisors.filter((_, index) => index !== advisorIndex));
  };

  const otherContact = [
    {
      name: 'Head of CSE',
      designation: 'Department of CSE',
      email: 'headcse@uap-bd.edu',
    },
    {
      name: 'Department Administrative Office',
      designation: 'Department of CSE',
      email: 'dao.cse@uap-bd.edu',
    },
    {
      name: 'Hasanul Kabir',
      designation: 'Assistant Administrative Officer',
      phone: '01722398613',
    },
  ];

  const [loaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-medium': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.subTitle}>Select Advisor:</Text>
      <Pressable onPress={() => setModalVisible(true)} style={styles.addButton}>
        <View style={styles.buttonContent}>
          <Ionicons name="add-circle" size={24} color="black" style={styles.icon} />
          <Text>Add Advisor</Text>
        </View>
      </Pressable>

      <ScrollView>
        {selectedAdvisors.map((advisor, index) => (
          <Pressable key={index} style={styles.advisorContainer}>
            <View style={styles.advisorContent}>
              <Text style={styles.advisorName}>{advisor.name}</Text>
              <Text style={styles.advisorDesignation}>{advisor.designation}</Text>
              <TouchableOpacity style={styles.contactContainer} onPress={() => Linking.openURL(`mailto:${advisor.email}`)}>
                <Ionicons name="mail" size={20} color="black" style={styles.icon} />
                <Text style={styles.advisorEmail}>{advisor.email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactContainer} onPress={() => Linking.openURL(`tel:${advisor.phone}`)}>
                <Ionicons name="call" size={20} color="black" style={styles.icon} />
                <Text style={styles.advisorPhone}>{advisor.phone}</Text>
              </TouchableOpacity>
            </View>
            <Pressable onPress={() => removeAdvisor(index)}>
              <Ionicons name="close-circle-outline" size={24} color="red" style={styles.removeIcon} />
            </Pressable>
          </Pressable>
        ))}

        {otherContact.map((contact, index) => (
          <View key={index} style={styles.daoContainer}>
            <View style={styles.advisorContent}>
              <Text style={styles.advisorName}>{contact.name}</Text>
              <Text style={styles.advisorDesignation}>{contact.designation}</Text>
              {contact.email && (
                <TouchableOpacity style={styles.contactContainer} onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
                  <Ionicons name="mail" size={20} color="black" style={styles.icon} />
                  <Text style={styles.advisorEmail}>{contact.email}</Text>
                </TouchableOpacity>
              )}
              {contact.phone && (
                <TouchableOpacity style={styles.contactContainer} onPress={() => Linking.openURL(`tel:${contact.phone}`)}>
                  <Ionicons name="call" size={20} color="black" style={styles.icon} />
                  <Text style={styles.advisorPhone}>{contact.phone}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            {faculties.map((advisor: Faculty, index: number) => (
              <Pressable key={index} onPress={() => addAdvisor(advisor)} style={styles.modalAdvisors}>
                <Text style={styles.modaltext}>{advisor.name}</Text>
                <Text>{advisor.designation}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={30} color="red" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-medium',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  advisorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#bae6d4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  daoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cbd1ff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  advisorContent: {
    flex: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  advisorEmail: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  advisorPhone: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5, // Adjust as needed
  },
  advisorName: {
    fontSize: 17,
    fontFamily: 'Poppins-medium',
  },
  advisorDesignation: {
    fontSize: 16,
  },

  removeIcon: {
    marginLeft: 10,
    top: 30,
    right: 10,
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  modalContainer: {
    position: 'absolute',
    top: '30%', // Adjust as needed
    left: '10%',
    right: '10%',
    bottom: '20%', // Adjust as needed
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalAdvisors: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  modaltext: {
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  
});

export default Emergency;
