/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState(
    require('../../assets/avatar.png'),
  );
  const [profileD, setProfileD] = useState({
    name: 'Pushparaj singh',
    phone: '9838405840',
    email: 'singhpushparaj',
    vehicle: 'todo',
    bio: '',
    preferences: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [target, setTarget] = useState('');
  const handleMobileChange = newdata => {
    console.log(target, newdata);
    setProfileD({
      ...profileD, // Copy the existing state object
      [target]: newdata, // Update the mobile number with the new value
    });
  };

  const handleEditProfilePic = () => {
    // Implement logic for editing personal details
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{target}</Text>
              <TextInput
                value={profileD[target]}
                onChangeText={text => handleMobileChange(text, target)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Okey</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.name}>{profileD.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setTarget('name');
                setModalVisible(true);
              }}>
              <AntDesign
                name="edit"
                size={20}
                color="#00B0FF"
                style={{marginLeft: 5, paddingBottom: 10}}
              />
            </TouchableOpacity>
          </View>

          <Image source={profilePic} style={styles.profilePic} />
        </View>
        <TouchableOpacity
          onPress={handleEditProfilePic}
          style={styles.editProfilePic}>
          <Text style={styles.textClick}>Edit Profile Picture</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        {/* profile section start */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Verify your profile</Text>
          {/* email test */}
          <TouchableOpacity
            onPress={() => {
              setTarget('email');
              setModalVisible(true);
            }}>
            <View style={styles.sectionRow}>
              <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
              <View style={styles.sectionDataColoum}>
                <Text style={styles.sectionText}>Comfirm email</Text>
                {profileD.email && (
                  <Text style={styles.sectionText}>{profileD.email}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTarget('phone');
              setModalVisible(true);
            }}>
            <View style={styles.sectionRow}>
              <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
              <View style={styles.sectionDataColoum}>
                <Text style={styles.sectionText}>Comfirm phone number</Text>
                {profileD.phone && (
                  <Text style={styles.sectionText}>{profileD.phone}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About you</Text>
          <TouchableOpacity
            onPress={() => {
              setTarget('bio');
              setModalVisible(true);
            }}>
            <View style={styles.sectionRow}>
              <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
              <View style={styles.sectionDataColoum}>
                <Text style={styles.sectionText}>Add a mini bio</Text>
                {profileD.bio && (
                  <Text style={styles.sectionText}>{profileD.bio}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTarget('preferences');
              setModalVisible(true);
            }}>
            <View style={styles.sectionRow}>
              <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
              <View style={styles.sectionDataColoum}>
                <Text style={styles.sectionText}>Add my preferences</Text>
                {profileD.preferences && (
                  <Text style={styles.sectionText}>{profileD.preferences}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Vehicle</Text>
          <TouchableOpacity>
            <View style={styles.sectionRow}>
              <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
              <View style={styles.sectionDataColoum}>
                <Text style={styles.sectionText}>Add Vehicle</Text>
                {profileD.vehicle && (
                  <Text style={styles.sectionText}>{profileD.vehicle}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    color: '#054752',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#054752',
  },
  sectionRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  sectionDataColoum: {
    marginLeft: 20,
  },

  sectionText: {
    color: '#00B0FF',
    fontWeight: 600,
  },
  editButton: {
    color: 'blue',
    marginBottom: 10,
  }, //modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    height: '100%',
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
