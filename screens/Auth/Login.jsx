import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setAuthenticated(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading === false && authenticated) {
      navigation.replace('HomeStack');
    }
  }, [authenticated]);

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
