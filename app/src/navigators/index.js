import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen, WelcomeScreen, SigninScreen, SignupScreen, RegisterPhoneScreen,ForgetPasswordScreen} from "../screens";

const Stack = createStackNavigator();

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
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
