import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import colors from '../Colors';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const [loaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-medium': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/uni.jpg')} 
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.appName}>UAPedia</Text>
            <Text style={styles.slogan}>Your UAP CSE companion</Text>
          </View>
        </View>

        <View style={styles.options}>
  <Link href="/Academic" style={styles.option}>
    <View style={styles.optionContent}>
      <Text style={styles.optionText}>Academic Calendar</Text>
      <Ionicons name="calendar" size={20} color={colors.light} style={styles.icon} />
    </View>
  </Link>

  <Link href="/Events" style={styles.option}>
    <View style={styles.optionContent}>
      <Text style={styles.optionText}>Events & Notice</Text>
      <Ionicons name="notifications" size={20} color={colors.light} style={styles.icon} />
    </View>
  </Link>

  <Link href="/Faculty" style={styles.option}>
    <View style={styles.optionContent}>
      <Text style={styles.optionText}>Faculty</Text>
      <Ionicons name="people" size={20} color={colors.light} style={styles.icon} />
    </View>
  </Link>

  <Link href="/Emergency" style={styles.option}>
    <View style={styles.optionContent}>
      <Text style={styles.optionText}>Emergency</Text>
      <Ionicons name="alert" size={20} color={colors.light} style={styles.icon} />
    </View>
  </Link>
</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 40,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    position: 'relative',

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    color: colors.light,
    fontFamily: 'Poppins-medium',
  },
  slogan: {
    fontSize: 16,
    color: colors.light,
    fontFamily: 'Poppins-Regular',
  },
  options: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  option: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 18,
    color: colors.light,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  icon: {
    marginLeft: 5,
  },
});

export default Home;
