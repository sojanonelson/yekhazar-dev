import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SplashScreen,
  WelcomeScreen,
  SigninScreen,
  SignupScreen,
  HomeScreen,
  RegisterPhoneScreen,
  ForgetPasswordScreen,
  ProductDetail,
  PaymentScreen,
  SingleCategory,
  SettingsScreen,
  ManageAddress,
  AddAddressScreen,
  UpdateAddressScreen,
  ProfileScreen,
  CartScreen,
  ChangePasswordScreen,
  ReviewAddScreen
} from "../screens";
import { TestDrawer, DrawerScreen } from "../components";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigators = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerScreen {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
      <Drawer.Screen name="SingleCategory" component={SingleCategory} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="ManageAddress" component={ManageAddress} />
      <Drawer.Screen name="AddAddress" component={AddAddressScreen} />
      <Drawer.Screen name="UpdateAddress" component={UpdateAddressScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ReviewAdd" component={ReviewAddScreen}/>
    </Drawer.Navigator>
  );
};

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Forgot" component={ForgetPasswordScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={DrawerNavigators}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
