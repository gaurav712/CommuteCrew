import {StyleSheet, Text, View} from 'react-native';

const UserTypeSelector = ({value = 'Rider', onChange = () => {}}) => {
  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Text
          style={[
            styles.userType,
            {
              backgroundColor: value === 'Rider' ? '#808080' : '#ffffff',
              color: value === 'Rider' ? '#ffffff' : '#808080',
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
            },
          ]}
          onPress={() => onChange('Rider')}>
          Rider
        </Text>
        <View style={styles.divider} />
        <Text
          style={[
            styles.userType,
            {
              backgroundColor: value === 'Owner' ? '#808080' : '#ffffff',
              color: value === 'Owner' ? '#ffffff' : '#808080',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
          onPress={() => onChange('Owner')}>
          Owner
        </Text>
      </View>
      <Text style={styles.label}>I am a</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 35,
  },
  borderEraser: {
    height: 1,
    width: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 15,
  },
  label: {
    position: 'absolute',
    top: -25,
    left: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    alignSelf: 'flex-start',
  },
  selectorContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  divider: {
    height: '100%',
    width: 0.5,
    backgroundColor: 'grey',
  },
  userType: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    paddingVertical: 10,
  },
});

export default UserTypeSelector;
