import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { Colors, CountryCode, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlagItem, Separator } from "../components";
import { Display } from "../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  CategoryService,
  ProductService,
  StaticImageService,
} from "../services";
import { AuthenicationService } from "../services";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/userSlice";
import { fetchProductsSuccess } from "../redux/slices/productSlice";
import { getBrandsSuccess } from "../redux/slices/BrandSlice";
import { getCategorySuccess } from "../redux/slices/categorySlice";
import BrandService from "../services/BrandService";
import AuthenticationService from "../services/AuthenticationService";

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const RegisterPhoneScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { formData } = route.params || {};

  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "India")
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    setIsLoading(true);
    const user = {
      ...formData,
      phoneNumber,
    };

    console.log("SIGNIN req:", user);

    try {
      const allCategories = await CategoryService.getAllCategory();
      dispatch(getCategorySuccess(allCategories));

      const allBrands = await BrandService.getAllBrands();
      dispatch(getBrandsSuccess(allBrands));

      const singleSlug = await CategoryService.getSingleCategory();

      const allproduct = await ProductService.getAllProduct();
      dispatch(fetchProductsSuccess(allproduct));

      console.log("AllCategory:", allCategories);
      console.log("AllBrands:", allBrands);
      console.log("SingleSlug:", singleSlug);

      const response = await AuthenticationService.register(user).then(
        (response) => {
          console.log("Signin  Response : ", response);
          dispatch(loginSuccess(response));
          if (!response?.success) {
            console.log("Enter valid details");
          } else if (response?.success) {
            setIsLoading(false);
            Alert.alert("Registration Successful");
            // navigation.navigate("Main");
          }
        }
      );

      // Handle successful registration
    } catch (error) {
      setIsLoading(false);
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
        closeDropdown(pageX, pageY)
      }
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEAFULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Register Phone</Text>
      </View>
      <Text style={styles.title}>Register Phone</Text>
      <Text style={styles.content}>
        Enter your registered phone number to login.
      </Text>
      <View
        style={styles.inputsContainer}
        onLayout={({
          nativeEvent: {
            layout: { y },
          },
        }) => setInputsContainerY(y)}
      >
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            source={{
              uri: StaticImageService.getFlagIcon(selectedCountry.code),
            }}
            style={styles.flatIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={styles.inputText}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          {/* setPhoneNumber(selectedCountry?.dial_code + text) */}
        </View>
      </View>

      <TouchableOpacity
        style={styles.signinButton}
        activeOpacity={0.8}
        onPress={() => handleFinish()}
      >
        {isLoading ? (
          <Image source={Images.LOAD} />
        ) : (
          <Text style={styles.signinButtonText}>Complete Register</Text>
        )}
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: { x, y, height, width },
            },
          }) => setDropdownLayout({ x, y, height, width })}
        >
          <FlatList
            data={CountryCode}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <FlagItem
                {...item}
                onPress={(country) => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
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
  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flexDirection: "row",
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: "center",
    flex: 1,
  },
  flatIcon: {
    height: 20,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
  },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: "absolute",
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
  },
  signinButton: {
    backgroundColor: Colors.DEAFULT_BG,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEAFULT_WHITE,
  },
});

export default RegisterPhoneScreen;
