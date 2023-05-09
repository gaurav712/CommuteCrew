import {Pressable, StyleSheet, Text} from 'react-native';

const Button = ({label, onPress = () => {}}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#eeeeee',
    fontFamily: 'Raleway-Regular',
  },
});

export default Button;
