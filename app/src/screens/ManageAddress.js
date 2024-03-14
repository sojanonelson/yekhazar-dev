import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserService } from "../services";
import { Colors } from "../contants";
import {
  AddAddress,
  Separator,
  SettingsHeader,
  UpdateAddress,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../redux/slices/userSlice";
import { setSelectedAddress } from "../redux/slices/GeneralSlice";

const ManageAddress = () => {
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const [userAddresses, setUserAddresses] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await UserService.getAddress(token);
          setUserAddresses(response.addresses);
          dispatch(setAddress(response.addresses));
          console.log("User Addresses:", response.addresses);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchData();
    }, [token])
  );

  const goForUpdate = (address) => {
    dispatch(setSelectedAddress(address));
    navigation.navigate("UpdateAddress");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      <SettingsHeader title={"Manage Address"} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userAddresses.length > 0 ? (
          userAddresses.map((address, index) => (
            <TouchableOpacity key={index} onPress={() => goForUpdate(address)}>
              <View style={styles.addressContainer} key={index}>
                <View style={styles.addressItem}>
                  <Text style={styles.serialNumber}>{index + 1}</Text>
                  <View style={styles.addressTextContainer}>
                    <Text style={styles.addressText}>{address.address},</Text>
                    <Text style={styles.addressText}>{address.state},</Text>
                    <Text style={styles.addressText}>{address.city},</Text>
                    <Text style={styles.addressText}>{address.zipCode},</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>No address found</Text>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddAddress")}
        >
          <Text style={styles.addButtonLabel}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEAFULT_WHITE,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  addressContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  serialNumber: {
    fontWeight: "bold",
    marginRight: 5,
    color: Colors.DEFAULT_BLACK,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  addressText: {
    color: Colors.DEFAULT_BLACK,
    flexWrap: "wrap",
  },
  addButton: {
    backgroundColor: Colors.DEAFULT_BG,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonLabel: {
    fontSize: 16,
    color: Colors.DEAFULT_WHITE,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: Colors.DEFAULT_BLACK,
  },
});

export default ManageAddress;
