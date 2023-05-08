/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState(require('../avatar.png'));
  const [name, setName] = useState('Pushparaj singh');
  const [bio, setBio] = useState('Avid traveler and foodie');
  const [personalDetails, setPersonalDetails] = useState({
    email: 'johndoe@example.com',
    age: 30,
    location: 'New York, NY',
  });
  const [phoneNumber, setPhoneNumber] = useState('555-1234');
  const [vehicle, setVehicle] = useState({
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
  });

  const handleEditProfilePic = () => {
    // Implement logic for editing profile picture
  };

  const handleEditPersonalDetails = () => {
    // Implement logic for editing personal details
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>{name}</Text>

        <Image source={profilePic} style={styles.profilePic} />
      </View>
      <TouchableOpacity
        onPress={handleEditProfilePic}
        style={styles.editProfilePic}>
        <Text style={styles.textClick}>Edit Profile Picture</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Verify your profile</Text>
        <Ionicons name="ios-add-outline" size={30} color="#00B0FF" />
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Details</Text>
        <TouchableOpacity onPress={handleEditPersonalDetails}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <Text>Email: {personalDetails.email}</Text>
        <Text>Age: {personalDetails.age}</Text>
        <Text>Location: {personalDetails.location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Phone Number</Text>
        <Text>{phoneNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Vehicle</Text>
        <Text>Make: {vehicle.make}</Text>
        <Text>Model: {vehicle.model}</Text>
        <Text>Year: {vehicle.year}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '90%',
    backgroundColor: '#FFFFFF',
    padding: '5%',
  },
  line: {borderWidth: 0.5, borderColor: '#E0E0E0', marginVertical: 20},
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'center',
    backgroundColor: '#E0E0E0',
  },
  editProfilePic: {
    marginVertical: 10,
  },
  textClick: {
    color: '#00B0FF',
    fontWeight: 600,
    fontSize: 18,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#006064',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#006064',
  },
  bio: {
    fontStyle: 'italic',
  },
  editButton: {
    color: 'blue',
    marginBottom: 10,
  },
});
