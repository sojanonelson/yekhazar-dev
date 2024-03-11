import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SplashScreen, WelcomeScreen, SigninScreen, SignupScreen,HomeScreen, RegisterPhoneScreen, ForgetPasswordScreen, ProductDetail } from "../screens";
import { TestDrawer } from "../components";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigators = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <TestDrawer {...props} />}>
        <Drawer.Screen options={{ headerShown: false }} name="Main" component={HomeStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const HomeStackNavigator = () => {
  return (
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
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default Navigators;
