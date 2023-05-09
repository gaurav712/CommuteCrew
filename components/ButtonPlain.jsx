import {Pressable, StyleSheet, Text} from 'react-native';

const ButtonPlain = ({label, onPress = () => {}}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Raleway-SemiBold',
  },
});

export default ButtonPlain;
