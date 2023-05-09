import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = ({onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="arrow-back" size={30} color="#000000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    top: 20,
    height: 45,
    width: 45,
    borderRadius: 22.5,
    elevation: 10,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
