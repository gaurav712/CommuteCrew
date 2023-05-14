import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FloatingActionButton = ({onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="arrow-forward" size={35} color="#000000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 55,
    width: 55,
    borderRadius: 27.5,
    elevation: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingActionButton;
