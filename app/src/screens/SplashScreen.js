import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import { Colors, Images } from "../contants";
import { Display } from "../utils";
import { displayAllData, localUserData } from "../services/StorageService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/userSlice";
import { getCategorySuccess } from "../redux/slices/categorySlice";
import { getBrandsSuccess } from "../redux/slices/BrandSlice";
import { fetchProductsSuccess } from "../redux/slices/productSlice"; 
import CategoryService from "../services/CategoryService"; 
import BrandService from "../services/BrandService";
import {

  ProductService,
  
} from "../services";
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userToken, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  console.log("APPLOADING...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { token, userData } = await localUserData();
        setToken(token);
        setUserData(userData);
        console.log("userData from local:", userData);
        console.log("token from local:", token);

        dispatch(loginSuccess(userData));

        if (token && userData) {
          const allCategories = await CategoryService.getAllCategory();
          dispatch(getCategorySuccess(allCategories));
    
          const allBrands = await BrandService.getAllBrands();
          dispatch(getBrandsSuccess(allBrands));
    
          const allProduct = await ProductService.getAllProduct();
          dispatch(fetchProductsSuccess(allProduct));
          navigation.navigate("Main");
        } else {
          navigation.navigate("Welcome");
        }
      } catch (error) {
        console.log("Error retrieving user credentials",);
        navigation.navigate("Welcome");
      }
    };
  
    fetchData();
  }, [navigation, dispatch]); 


  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.DEAFULT_BG}
        translucent
        barStyle="light-content"
      />
      <Image source={Images.LOGO} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}>YEKHAZAR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEAFULT_BG,
  },
  image: {
    marginTop: Display.setHeight(10),
    height: Display.setHeight(10),
    width: Display.setWidth(20),
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

export default SplashScreen;
