/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');
const GOOGLE_PLACES_API_KEY = 'AIzaSyBefV0iljWcdxXDQ9rxhPkjrv-eXFR6pHk';
export default function SearchScreen() {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [start, setStart] = useState('Starting location');
  const [distination, setDistination] = useState('distination');
  return (
    <View style={{flex: 1, backgroundColor: '#D1C4E9'}}>
      <ImageBackground
        source={require('../2.png')}
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
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View>
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
                setStart(data.description);
              }}
              onFail={error => console.error(error)}
              currentLocation={true}
              currentLocationLabel="Current location"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible1(!modalVisible1)}>
              <Text style={styles.textStyle}>OKEY</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible2(!modalVisible2);
        }}>
        <View>
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
                setDistination(data.description);
              }}
              onFail={error => console.error(error)}
              currentLocation={true}
              currentLocationLabel="Current location"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible2(!modalVisible2)}>
              <Text style={styles.textStyle}>OKEY</Text>
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
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <Text
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginTop: 25,
                marginHorizontal: 15,
              }}>
              {start}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible2(true)}>
            <Text
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginTop: 20,
                marginHorizontal: 15,
              }}>
              {distination}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('search press')}>
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    height: '100%',
    width: '100%',
    padding: 35,
    // alignItems: 'center',
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
    width: '50%',
    alignSelf: 'center',
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
