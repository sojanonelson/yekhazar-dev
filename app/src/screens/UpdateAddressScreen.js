import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../contants";
import { Separator, SettingsHeader } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../services";
import { setSelectedAddress } from "../redux/slices/GeneralSlice";

const UpdateAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const selectedAddress = useSelector((state) => state.general.selectedAddress);
  const token = useSelector((state) => state.user.user.token);
  const addressId = useSelector((state) => state.general.selectedAddress._id);

  const [formData, setFormData] = useState({
    address: "",
    state: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // Populate formData with selected address data when the component mounts
    setFormData(selectedAddress);
  }, [selectedAddress]);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateAddress = async () => {
    try {
      const response = await UserService.updateAddress(
        formData,
        token,
        addressId
      );
     
      if (response.success) {
        navigation.navigate("ManageAddress");
      } else {
        console.log("Address update failed.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const deleteAddress = async () => {
    try {
      const response = await UserService.deleteAddress(addressId, token);
      console.log("Deletion response:", response)
      if (response.success) {
        
        
        navigation.navigate("ManageAddress");
      } else {
        console.log("Address delete failed.");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      <SettingsHeader title={"Update Address"} />

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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => updateAddress()}
      >
        <Text style={styles.addButtonLabel}>Save Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteAddress()}
      >
        <Text style={styles.deleteButtonLabel}>Remove this address</Text>
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
    paddingTop: 10,
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
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonLabel: {
    fontSize: 16,
    color: Colors.DEAFULT_WHITE,
  },
  deleteButton: {
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    borderColor: Colors.ERROR_RED,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonLabel: {
    fontSize: 16,
    color: Colors.ERROR_RED,
  },
});

export default UpdateAddressScreen;
