/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState(
    require('../../assets/avatar.png'),
  );
  const [name, setName] = useState('Pushparaj singh');
  const [email, setEmail] = useState('singhpushparaj31@gmail.com');
  const [phone, setPhone] = useState('8840587225');
  const [bio, setBio] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [preferences, setPreferences] = useState('');
  const [target, setTarget] = useState('');
  const [vehicle, setVehicle] = useState();
  const kk = {
    email: setEmail,
    phone: setPhone,
  };
  const handleEditProfilePic = () => {
    // Implement logic for editing personal details
  };

  return (
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                kk[target](9838405840);
                // const the = target.charAt(0).toUpperCase() + target.slice(1);
                // console.log(the);
                // `set${the}`('the');
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
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
        <Text style={styles.name}>{name}</Text>

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
              {email && <Text style={styles.sectionText}>{email}</Text>}
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
              {phone && <Text style={styles.sectionText}>{phone}</Text>}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About you</Text>
        <View style={styles.sectionRow}>
          <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
          <View style={styles.sectionDataColoum}>
            <Text style={styles.sectionText}>Add a mini bio</Text>
            {bio && <Text style={styles.sectionText}>{bio}</Text>}
          </View>
        </View>
        <View style={styles.sectionRow}>
          <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
          <View style={styles.sectionDataColoum}>
            <Text style={styles.sectionText}>Add my preferences</Text>
            {preferences && (
              <Text style={styles.sectionText}>{preferences}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Vehicle</Text>
        <View style={styles.sectionRow}>
          <AntDesign name="pluscircleo" size={20} color="#00B0FF" />
          <View style={styles.sectionDataColoum}>
            <Text style={styles.sectionText}>Add Vehicle</Text>
            {vehicle && <Text style={styles.sectionText}>{vehicle}</Text>}
          </View>
        </View>
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
