import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Separator } from "../components";
import Ioncion from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Colors, Images } from "../contants";
import { Display } from "../utils";

const SignupScreen = ({ navigation }) => {
  const [isPasswordShow, setPasswordShow] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    let user = formData;
    console.log("User:", user);
    navigation.navigate("RegisterPhone", { formData });
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
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>
        Enter your email, choose a username and password
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <TextInput
            placeholder="Firstname"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
          />
        </View>
      </View>

      <Separator />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <TextInput
            placeholder="Lastname"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />
        </View>
      </View>

      <Separator />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>
      </View>

      <Separator />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <Feather
            name={isPasswordShow ? "eye" : "eye-off"}
            size={22}
            color={Colors.DEAFULT_LIGHT_GREY}
            style={{ marginTop: 10, marginLeft: 170 }}
            onPress={() => setPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text></Text>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => handleNext()}
      >
        <Text style={styles.signupButtonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonConatiner}>
          <View style={styles.signupButtonLogoConatiner}>
            <Image
              style={styles.signupButtonLogo}
              source={Images.GOOGLE_ICON}
            />
          </View>
          <Text style={styles.GoogleButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
    borderColor: Colors.DEFAULT_GREY,
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
  forgetPasswordConatiner: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREY,
  },
  forgetPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEAFULT_BG,
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
  signupConatiner: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  signupText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEAFULT_BG,

    marginLeft: 5,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,

    marginLeft: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  googleButton: {
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.DEFAULT_GREY,
    borderWidth: 0.5,
  },
  signupButtonLogo: {
    height: 25,
    width: 25,
  },
  signupButtonLogoConatiner: {
    backgroundColor: Colors.DEAFULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: "absolute",
    left: 25,
  },
  socialButtonConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  signupButtonText: {
    color: Colors.DEAFULT_WHITE,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  GoogleButtonText: {
    color: Colors.DEFAULT_BLACK,
  },
});
export default SignupScreen;
