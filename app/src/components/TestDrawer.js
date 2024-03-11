import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TestDrawer = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigateToScreen("Welcome")}
      >
        <Text style={styles.drawerItemText}>Welcome</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigateToScreen("Signin")}
      >
        <Text style={styles.drawerItemText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerItemText: {
    fontSize: 18,
  },
});

export default TestDrawer;
