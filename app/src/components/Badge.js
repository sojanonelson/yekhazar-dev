import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 999,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
