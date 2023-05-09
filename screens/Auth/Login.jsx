import {Pressable, Text, TouchableOpacity, View} from 'react-native';

const Login = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'grey',
          color: 'white',
          padding: 10,
          elevation: 10,
          zIndex: 100,
        }}
        onPress={() => {
          navigation.replace('HomeStack');
        }}>
        <Text>Next Stack</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
