import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  
  import React, { useEffect, useState } from "react";
  import { Separator, ToggleButton } from "../components";
  import Ioncion from "@expo/vector-icons/Ionicons";
  import Feather from "@expo/vector-icons/Feather";
  import { Colors, Images } from "../contants";
  import { Display } from "../utils";
  import { useDispatch } from "react-redux";
  import {
    AuthenicationService,
    ProductService,
    CategoryService,
  } from "../services";
  import { fetchProductsSuccess } from "../redux/slices/productSlice";
  import { loginSuccess } from "../redux/slices/userSlice";
  import { getCategorySuccess } from "../redux/slices/categorySlice";
  import BrandService from "../services/BrandService";
  import { getBrandsSuccess } from "../redux/slices/BrandSlice";

const SigninScreen = () => {
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



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
            <Text style={styles.headerTitle}>Sign in</Text>
          </View>
    
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.content}>
            Enter your username and password,and enjoy shopping.
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
                placeholder="Email"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
              />
              <Feather
                name={isPasswordShow ? "eye" : "eye-off"}
                size={22}
                color={Colors.DEFAULT_GREY}
                style={{ marginTop: 14, marginLeft: 190 }}
                onPress={() => setPasswordShow(!isPasswordShow)}
              />
            </View>
          </View>
          {error ? (
            <Text style={styles.error}>Incorrect email or password</Text>
          ) : null}
    
          <View style={styles.forgetPasswordConatiner}>
            <View style={styles.toggleContainer}>
              
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>
            <Text style={styles.forgetPasswordText}>Forget Password</Text>
          </View>
    
          <TouchableOpacity style={styles.signinButton}>
            {isLoading ? (
              <Image source={Images.LOAD} />
            ) : (
              <Text style={styles.signinButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
    
          <View style={styles.signupConatiner}>
            <Text style={styles.accountText}>Dont have an account?</Text>
            <Text style={styles.signupText}>Sign Up</Text>
          </View>
          <Text style={styles.orText}>Or</Text>
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.socialButtonConatiner}>
              <View style={styles.signupButtonLogoConatiner}>
                <Image
                  style={styles.signupButtonLogo}
                  source={Images.GOOGLE_ICON}
                />
              </View>
              <Text style={styles.signupButtonText}>Connect with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
}

export default SigninScreen

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
      backgroundColor: Colors.DEAFULT_WHITE,
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
    signupButtonText: {},
    toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      textAlign: "center",
      color: Colors.ERROR_RED,
    }
  });