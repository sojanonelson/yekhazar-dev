import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ioncion from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Colors, Images } from "../contants";
import { Separator } from "../components";
import { Display } from "../utils";
import { isLoading } from "expo-font";
import { AuthenicationService } from "../services";
const ForgetPasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const DoAlert = (text) => Alert.alert("Message", text, [{ text: "OK" }]);

  const forgotPassword = () => {
    let user = {
      email,
    };
    if (email) {
      AuthenicationService.forgotPassword(user).then((response) => {
        setIsLoading(false);
        DoAlert("Please check your email for the link to reset your password");
        navigation.navigate("Signin");
      });
    } else {
      DoAlert("Please enter a valid email address");
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
      <View style={styles.headerContainer}>
        <Ioncion
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.content}>
        Enter your email, so that we can help you to recover your password.
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10, marginTop: 15 }}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => forgotPassword()}
      >
        <Text style={styles.signinButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.DEAFULT_WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEAFULT_GREY,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    display: "flex",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_GREY,
  },
  signupButton: {
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
