import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import BackButton from '../../components/BackButton';
import FloatingActionButton from '../../components/FloatingActionButton';
import InputField from '../../components/InputField';
import SignUpCover from '../../components/SignUpCover';

const SignUp = ({navigation}) => {
  const handleSubmit = () => {
    navigation.replace('HomeStack');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#222c39'} />
      <View style={styles.coverContainer}>
        <SignUpCover />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputField label={'Your Name'} placeholder={'Enter your name'} />
        <InputField
          label={'Mobile'}
          placeholder={'Enter your phone number'}
          keyboardType={'numeric'}
        />
        <InputField
          label={'License No'}
          placeholder={'Enter your license number'}
        />
      </ScrollView>
      <BackButton onPress={() => navigation.goBack()} />
      <FloatingActionButton onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverContainer: {
    position: 'absolute',
    top: -15,
    right: 0,
    left: -10,
  },
  contentContainer: {
    paddingVertical: 20,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 0.6,
    top: '40%',
    marginTop: -40,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default SignUp;
