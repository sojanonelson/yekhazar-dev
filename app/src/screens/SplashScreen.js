import React, { useEffect } from "react";
import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import { Colors, Images } from "../contants";
import { Display } from "../utils";

const SplashScreen = ({ navigation }) => {
  console.log("APPLOADING...");

  useEffect(() => {
  
    

    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  }, []);

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
