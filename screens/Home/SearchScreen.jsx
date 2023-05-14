import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBackgroundImg from '../../assets/search-bg.jpg';
import PlacesInputField from '../../components/PlaceInputField';
import FloatingActionButton from '../../components/FloatingActionButton';

const viewportWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceFilled, setSourceFilled] = useState(false);
  const [destinationFilled, setDestinationFilled] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={SearchBackgroundImg}
        style={{
          width: viewportWidth,
          height: (viewportWidth * 629) / 1080,
        }}
      />
      <View
        style={[
          styles.inputsContainer,
          {
            position: isKeyboardVisible ? 'absolute' : 'relative',
            height: isKeyboardVisible ? '90%' : '100%',
          },
        ]}>
        {isKeyboardVisible ? (
          <Text style={styles.headingSmall}>Plan your journey</Text>
        ) : (
          <View style={styles.headingContainer}>
            <FontAwesome5 name="route" size={30} color="#808080" />
            <Text style={styles.heading}>Plan your journey</Text>
          </View>
        )}
        {sourceFilled && (
          <View style={styles.locationContainer}>
            <View style={styles.locationNameContainer}>
              <MaterialCommunityIcons
                name="navigation"
                size={25}
                color={'#808080'}
              />
              <Text style={styles.locationText}>{source}</Text>
            </View>
            <MaterialIcons
              name="edit-location"
              size={25}
              color={'#808080'}
              onPress={() => {
                setSourceFilled(false);
              }}
            />
          </View>
        )}
        {sourceFilled && !destinationFilled && (
          <PlacesInputField
            label={'To'}
            placeholder={'Enter destination'}
            onChange={({description}) => {
              setDestination(description);
              setDestinationFilled(true);
            }}
          />
        )}
        {!sourceFilled && (
          <PlacesInputField
            label={'From'}
            placeholder={'Enter source location'}
            onChange={({description}) => {
              setSourceFilled(true);
              setSource(description);
            }}
          />
        )}
        {sourceFilled && destinationFilled && (
          <>
            <View style={styles.locationContainer}>
              <View style={styles.locationNameContainer}>
                <MaterialIcons
                  name="location-pin"
                  size={25}
                  color={'#808080'}
                />
                <Text style={styles.locationText}>{destination}</Text>
              </View>
              <MaterialIcons
                name="edit-location"
                size={25}
                color={'#808080'}
                onPress={() => {
                  setDestinationFilled(false);
                }}
              />
            </View>
            <FloatingActionButton />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputsContainer: {
    bottom: 0,
    paddingHorizontal: '5%',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 25,
    borderBottomWidth: 0.5,
  },
  heading: {
    fontFamily: 'Raleway-SemiBold',
    alignSelf: 'flex-start',
    fontSize: 26,
    marginLeft: 10,
  },
  headingSmall: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: 'Raleway-SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'Raleway-SemiBold',
    marginLeft: 10,
  },
});

export default SearchScreen;
