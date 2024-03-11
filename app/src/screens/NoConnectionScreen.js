import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../contants';

const NoConnectionScreen = ({ onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.message}>No connection</Text>
    <Text style={styles.message}>Please check your internet connectivity and try again.</Text>
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.buttonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor:Colors.DEAFULT_BG,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NoConnectionScreen;
