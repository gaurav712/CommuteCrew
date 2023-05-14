import {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import axios from 'axios';
import {API_URL} from '../../constants';
import BackButton from '../../components/BackButton';
import FloatingActionButton from '../../components/FloatingActionButton';
import InputField from '../../components/InputField';
import SignUpCover from '../../components/SignUpCover';
import UserContext from '../../contexts/UserContext';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const userContext = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const deviceId = await getUniqueId();

      await axios.post(`${API_URL}/auth/user/create`, {
        deviceId,
        userName: name,
        contactNumber: mobile,
      });

      userContext.setUserData({
        deviceId,
        userName: name,
        contactNumber: mobile,
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (userContext.userData.userName) {
      ToastAndroid.show('Account Succesfully Created!', ToastAndroid.LONG);
      navigation.replace('HomeStack');
    }
  }, [userContext.userData.userName]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#222c39'} />
      <View style={styles.coverContainer}>
        <SignUpCover />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputField
          label={'Your Name'}
          placeholder={'Enter your name'}
          value={name}
          onChangeText={setName}
        />
        <InputField
          label={'Mobile'}
          placeholder={'Enter your phone number'}
          keyboardType={'numeric'}
          value={mobile}
          onChangeText={setMobile}
        />
      </ScrollView>
      <BackButton onPress={() => navigation.goBack()} />
      <FloatingActionButton onPress={handleSubmit} loading={loading} />
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
