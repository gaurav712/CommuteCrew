import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import ButtonPlain from '../../components/ButtonPlain';
import LoginCoverImage from '../../components/LoginCoverImage';

const BaseAuth = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <LoginCoverImage />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Compare & Save</Text>
        <Text style={styles.subheading}>on Rideshares</Text>
        <Text style={styles.normalText}>
          {'By sharing your trip\nwith someone with same destination'}
        </Text>
        <Button
          label={'Create Account'}
          onPress={() => navigation.navigate('SignUp')}
        />
        <ButtonPlain
          label={'Log In'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coverContainer: {
    position: 'absolute',
    top: 0,
    bottom: '50%',
    left: 0,
    right: 0,
  },
  contentContainer: {
    top: '50%',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Raleway-SemiBold',
  },
  subheading: {
    fontSize: 28,
    fontFamily: 'Raleway-Regular',
  },
  normalText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    fontFamily: 'Raleway-Regular',
  },
});

export default BaseAuth;
