import {StyleSheet, Text, TextInput, View} from 'react-native';

const InputField = ({
  label,
  placeholder,
  value = '',
  onChangeText = () => {},
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 20,
    fontFamily: 'Raleway-Regular',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    minWidth: '85%',
    fontSize: 16,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontFamily: 'Raleway-Regular',
  },
});

export default InputField;
