import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Separator, SettingsHeader } from "../components";

import { useNavigation } from "@react-navigation/native";
import { Colors, Images } from "../contants";
import { Display } from "../utils";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { UserService } from "../services";
import { useSelector } from "react-redux";

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state)=> state.user.token)

  const handlePasswordChange = async () => {
    
    if (!password || !confirmPassword) {
        showMessage({
            message: "Please enter both old and new passwords.",
            type: "danger",
        });
        return;
    }
    setIsLoading(true);
    console.log("Token:", token);
    console.log("Old Password", password);
    console.log("New Password", confirmPassword);
    try {
        const resetPassword = await UserService.resetPassword(password, confirmPassword, token);
        console.log("Reset password:", resetPassword);
        console.log("Success Status:", resetPassword.success);
        if (resetPassword.success) {
            showMessage({
                message: "Password updated successfully!",
                type: "success",
            });
        } else {
            showMessage({
                message: "Password update failed!",
                type: "danger",
            });
        }
    } catch (error) {
        console.log(error);
        showMessage({
            message: "An error occurred while updating password",
            type: "danger",
        });
    } finally {
        setIsLoading(false); 
    }
};


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <SettingsHeader title={"Security Settings"} />
      <FlashMessage position="bottom" />
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Old password:</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <TextInput
              value={password}
              placeholderTextColor={Colors.DEFAULT_GREY}
              placeholder="Enter old password"
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <Text style={styles.infoLabel}>New password:</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <TextInput
              value={confirmPassword}
              placeholder="Enter new password"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => handlePasswordChange()}
        >
          {isLoading ? (
            <Image source={Images.LOAD} />
          ) : (
            <Text style={styles.signinButtonText}>Reset Password</Text>
          )}
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
  inputContainer: {
    backgroundColor: Colors.DEAFULT_WHITE,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_GREY,
  },
  inputSubContainer: {
    flexDirection: "row",
    display: "flex",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoItem: {
    flexDirection: "col",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 20,
  },
  signinButton: {
    backgroundColor: Colors.DEAFULT_BG,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEAFULT_WHITE,
   
  },
});

export default ChangePasswordScreen;