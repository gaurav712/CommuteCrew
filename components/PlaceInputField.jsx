import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_KEY} from '../constants/secrets';

const GOOGLE_PLACES_API_KEY = API_KEY;

const PlacesInputField = ({label, placeholder, onChange = () => {}}) => {
  const renderRow = (data, index) => {
    return (
      <View key={index}>
        <Text style={styles.suggestionText} numberOfLines={1}>
          {data.description}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        style={styles.suggestion}
        placeholder={placeholder}
        textInputProps={{
          style: styles.input,
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:in',
        }}
        onPress={(data, _ = null) => {
          onChange(data);
        }}
        onFail={error => console.error(error)}
        currentLocation={false}
        renderRow={renderRow}
        enablePoweredByContainer={false}
      />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 20,
    fontFamily: 'Raleway-Regular',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  suggestion: {
    marginTop: -15,
    borderWidth: 1,
    borderTopWidth: 0,
    minWidth: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    maxHeight: 252,
  },
  suggestionText: {
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    height: 22,
    maxWidth: 350,
  },
  input: {
    borderWidth: 1,
    minWidth: '100%',
    fontSize: 16,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    fontFamily: 'Raleway-Regular',
  },
});

export default PlacesInputField;
