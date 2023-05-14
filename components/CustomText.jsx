import {StyleSheet, Text, View} from 'react-native';

const CustomText = ({Icon = () => <></>, text = ''}) => {
  return (
    <View style={styles.container}>
      {Icon && <Icon />}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: -5,
    fontFamily: 'Raleway-Regular',
  },
});

export default CustomText;
