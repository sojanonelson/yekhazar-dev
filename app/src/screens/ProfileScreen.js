import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { Colors, Images } from "../contants";
import { Separator, SettingsHeader } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Display } from "../utils";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

 
  const [updateDetails, setUpdateDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password:""
  })
  const updateUserDetails = (key, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };


  const userData = useSelector((state) => state.user.user.user);
  console.log("UserData frm  profile", userData);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      
      <SettingsHeader title={"Profile"}/>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        horizontal={false}
      >
        <View style={styles.profileSection}>
          <Image style={styles.profleImage} source={Images.PROFILE} />
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>First Name:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userData.firstName}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                
                onChangeText={(text) => updateUserDetails("firstName", text)}
                editable={true}
              />
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Name:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userData.lastName}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                
                onChangeText={(text) => updateUserDetails("lastName", text)}
                editable={true}
              />
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userData.email}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                onChangeText={(text) => updateUserDetails("email", text)}
                editable={true}
              />
            </View>
          </View>
          

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userData.phoneNumber}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                keyboardType="number-pad"
                onChangeText={(text) => setPhoneNumber(text)}
                editable={true}
              />
            </View>
          </View>
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.signinButton}>
          {isLoading ? (
            <Image source={Images.LOAD} />
          ) : (
            <Text style={styles.signinButtonText}>Update</Text>
          )}
        </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.DEAFULT_BG,
    padding: 20,
    paddingTop:20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoItem: {
    flexDirection: "col",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  profleImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_GREY,
  },
  inputContainer: {
    backgroundColor: Colors.DEAFULT_WHITE,
    paddingHorizontal: 20,

    margin: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: "center",
  },
  signinButton: {
    backgroundColor: Colors.DEAFULT_BG,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical:20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEAFULT_WHITE,
 
  },
});

export default ProfileScreen;
