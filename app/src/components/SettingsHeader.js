import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { Colors } from "../contants";
import { useNavigation } from "@react-navigation/native";

const SettingsHeader = ({ title }) => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicon name="menu" color="white" size={33} />
        </TouchableOpacity>

        <Text style={styles.headerText}>{title}</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicon name="home" color="white" size={33} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.DEAFULT_BG,
    padding: 20,
    paddingTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SettingsHeader;
