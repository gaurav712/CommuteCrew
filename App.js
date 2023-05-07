/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  ImageBackground,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');
const GOOGLE_PLACES_API_KEY = 'AIzaSyBefV0iljWcdxXDQ9rxhPkjrv-eXFR6pHk';
function SearchScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('Starting location');
  return (
    <View style={{flex: 1, backgroundColor: '#D1C4E9'}}>
      <ImageBackground
        source={require('./2.png')}
        style={{
          height: '70%', // set the height to half of the screen
          width: '100%',
          zIndex: -2,
          position: 'absolute',
        }}>
        <Text style={styles.textStyleBackground}>
          Your pick of rides at low prices
        </Text>
      </ImageBackground>
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
            <GooglePlacesAutocomplete
              placeholder="Search"
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                components: 'country:in',
              }}
              onPress={(data, details = null) => {
                console.log(data.description);
                setText(data.description);
              }}
              onFail={error => console.error(error)}
              currentLocation={true}
              currentLocationLabel="Current location"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

          zIndex: 3,
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: '30%',
            width: '90%',
            borderRadius: 20,
            marginTop: 30,
            // padding: 10,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginTop: 25,
                marginHorizontal: 15,
              }}>
              {text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginTop: 20,
                marginHorizontal: 15,
              }}>
              {/* {text} */}distination
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                marginTop: 10,
                backgroundColor: '#00B0FF',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                height: 40,
                color: '#fff',
                fontWeight: 400,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PublishScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
function YourRidesScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>YourRidesScreen!</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ProfileScreen!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused ? 'search-outline' : 'search-outline';
            } else if (route.name === 'Publish') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
            } else if (route.name === 'Your ride') {
              iconName = focused ? 'car-sport-outline' : 'car-sport-outline';
            } else if (route.name === 'Profile') {
              iconName = focused
                ? 'person-circle-outline'
                : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00B0FF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Publish" component={PublishScreen} />
        <Tab.Screen name="Your ride" component={YourRidesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    height: '100%',
    padding: 35,
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
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleBackground: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 25,
    letterSpacing: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
