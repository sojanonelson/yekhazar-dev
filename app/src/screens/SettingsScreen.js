import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Colors } from "../contants";
import { Separator, SettingsHeader } from "../components";
import Ionicon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
       <Separator height={StatusBar.currentHeight} />
      
      <SettingsHeader title={"Settings"} />
      <View style={styles.settingsList}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.settingText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.settingText}>Security Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy & Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.DEAFULT_BG,
    padding: 20,
    paddingTop:30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsList: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 18,
    color: Colors.DEFAULT_BLACK,
  },
  logoutText: {
    color: "red",
    textAlign: "center",
  },
});

export default SettingsScreen;