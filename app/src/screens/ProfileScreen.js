import React, { useState, useEffect } from "react";
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

import { Colors, Images } from "../contants";
import { Separator, SettingsHeader } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Display } from "../utils";
import { UserService } from "../services";
import { localUserData } from "../services/StorageService";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState(userData);

  useEffect(() => {
    setUserDetails(userData);
  }, [userData]);


  const updateUserDetails = (key, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const update = async ()=>{

    try{
      console.log("Updating...")

      const {token}= await localUserData()
      console.log("Token for profile", token)
      response = await UserService.updateProfile( userDetails, token )
      console.log("Update response",response)

    }catch(error){
      console.log(error)
    }

  }


  console.log("UserData from  profile", userDetails);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      <SettingsHeader title={"Profile"} />

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
                value={userDetails.firstName}
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
                value={userDetails.lastName}
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
                value={userDetails.email}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                editable={true}
                onChangeText={(text) => updateUserDetails("email", text)}
              />
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userDetails.phoneNumber}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                keyboardType="number-pad"
                onChangeText={(text) => updateUserDetails("phoneNumber", text)}
                editable={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.signinButton} onPress={()=> update()}>
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
    marginVertical: 20,
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
