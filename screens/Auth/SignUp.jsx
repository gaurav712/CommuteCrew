import {StatusBar, StyleSheet, Text, View} from 'react-native';
import BackButton from '../../components/BackButton';
import SignUpCover from '../../components/SignUpCover';

const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#222c39'} />
      <View style={styles.coverContainer}>
        <SignUpCover />
      </View>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <Text>SignUp Screen</Text>
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
    top: -25,
    right: 0,
    left: 0,
    bottom: '70%',
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '30%',
    marginTop: -25,
  },
});

export default SignUp;
