import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {API_URL} from '../../constants';
import UserContext from '../../contexts/UserContext';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const userContext = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    checkAccount();
  }, []);

  const checkAccount = async () => {
    try {
      const deviceId = await getUniqueId();
      const {data} = await axios.get(`${API_URL}/auth/${deviceId}`);
      if (data?.status !== 'SUCCESS') {
        ToastAndroid.show(
          'Account does not exist! Please Register.',
          ToastAndroid.LONG,
        );
        navigation.goBack();
      } else {
        userContext.setUserData({
          ...data?.user,
          usrToken: data?.usrToken,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (userContext.userData.userName) {
      navigation.replace('HomeStack');
    }
  }, [userContext.userData.userName]);

  return (
    <View style={styles.container}>
      <>
        {loading ? <ActivityIndicator size={50} color={'#000000'} /> : null}
        <Text style={styles.text}>Logging you in ...</Text>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
    fontFamily: 'Raleway-Regular',
  },
});

export default Login;
