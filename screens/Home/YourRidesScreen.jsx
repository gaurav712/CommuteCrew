import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const YourRidesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>YourRidesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourRidesScreen;
