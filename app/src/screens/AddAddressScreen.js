import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../contants";
import { Separator, SettingsHeader } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../services";

const AddAddressScreen = () => {
    const navigation = useNavigation();
  const token = useSelector((state) => state.user.user.token);
  const [formData, setFormData] = useState({
    address: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAddress = async () => {
    try {
      console.log("FormData:", formData);
      const response = await UserService.addAddress(formData, token);
     
      if(response.success){
        console.log("Address added: ", response);
        navigation.navigate("ManageAddress")

      }
    } catch (error) {
      console.log(error);
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
      <SettingsHeader title={"Add Address"} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={formData.state}
          onChangeText={(text) => handleInputChange("state", text)}
          placeholder="Enter your state"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(text) => handleInputChange("city", text)}
          placeholder="Enter your city"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          value={formData.zipCode}
          onChangeText={(text) => handleInputChange("zipCode", text)}
          placeholder="Enter your zip code"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={()=> handleSaveAddress()}>
        <Text style={styles.addButtonLabel}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEAFULT_WHITE,
  },
  inputContainer: {
    marginBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.DEFAULT_BLACK,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.DEFAULT_BLACK,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: Colors.DEAFULT_BG,
    borderRadius: 8,
    height: 40,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonLabel: {
    fontSize: 16,
    color: Colors.DEAFULT_WHITE,
  },
});

export default AddAddressScreen;
