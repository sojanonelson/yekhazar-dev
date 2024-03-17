import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React,{useEffect, useState} from "react";
import Separator from "./Separator";
import { Colors } from "../contants";
import { useSelector, useDispatch } from "react-redux";
import Ionicon from "@expo/vector-icons/Ionicons";
import {
  setShowcaseProduct,
  setShowcaseProductname,
} from "../redux/slices/GeneralSlice";
import { ProductService } from "../services";

import { localUserData } from "../services/StorageService";

const DrawerScreen = ({ navigation }) => {
  const [userData, setUserData] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        
        const { userData } = await localUserData();
        setUserData(userData);
        
        console.log("userData:", userData );
      } catch (error) {
        console.error("Error retrieving user credentials:", error);
      }
    };

    fetchData();



  }, []);

 

  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user.user.user);
  const categoryData = useSelector((state) => state.category.category);
  const showcaseProductName = useSelector(
    (state) => state.general.showcaseProductName
  );

  const showCaseHandler = async (categoryname) => {
    try {
      dispatch(setShowcaseProductname(categoryname));
      const product = await ProductService.getSingleProductByCategory(
        categoryname
      );
      dispatch(setShowcaseProduct(product.products));
      navigation.navigate("SingleCategory")
      
    } catch (error) {
      console.log("🪐Drawer showCase Error: ", error);
    }
  };

  const brandData = useSelector((state) => state.brand.brands);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      horizontal={false}
    >
      <View>
        <View style={styles.profile}>
          <Separator height={20} />
          <Text style={styles.profileName}>Profile</Text>
          <Text style={styles.drawerProfileText}>
            Hey! {userData.firstName}
          </Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>

        <View style={styles.drawerContent}>
          <View style={styles.drawerCategory}>
            <Text style={styles.drawerTitle}>Top Categories</Text>
            {categoryData.map((categoryName, index) => (
              <TouchableOpacity
                onPress={() => showCaseHandler(categoryName)}
                key={index}
                style={styles.drawerButton}
              >
                <Text style={styles.drawerButtonText}>{categoryName}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Separator height={15} />

          <View style={styles.drawerCategory}>
            <Text style={styles.drawerTitle}>Top Brands</Text>
            {brandData.map((brandName, index) => (
              <TouchableOpacity key={index} style={styles.drawerButton}>
                <Text style={styles.drawerButtonText}>{brandName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicon
            name="person"
            color="black"
            style={styles.optionIcon}
            size={25}
          />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("ManageAddress")}
        >
          <Ionicon
            name="bag"
            style={styles.optionIcon}
            color="black"
            size={25}
          ></Ionicon>
          <Text style={styles.optionText}>Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicon
            name="location"
            style={styles.optionIcon}
            color="black"
            size={25}
          ></Ionicon>
          <Text style={styles.optionText}>My Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicon
            name="cart"
            style={styles.optionIcon}
            color="black"
            size={25}
          ></Ionicon>
          <Text style={styles.optionText}>My Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicon
            name="settings"
            style={styles.optionIcon}
            color="black"
            size={25}
          />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicon name="log-out-outline" color="white" size={33} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DEAFULT_BG,
    marginVertical: 10
  },
  drawerContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DEAFULT_WHITE,
  },
  drawerButton: {
    backgroundColor: Colors.SECONDARY_BG,
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 1,
    borderRadius: 6,
  },
  drawerText: {
    fontSize: 14,
  },
  drawerProfileText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEAFULT_WHITE,
  },
  drawerCategory: {
    marginTop: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D04848",

    padding: 10,
    borderRadius: 2,
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,

  },
  logoutContainer: {
    marginTop: "auto",
  },
  profile: {
    backgroundColor: Colors.SECONDARY_BG,
    color: Colors.DEAFULT_WHITE,
    padding: 10,
  },
  profileName: {
    paddingVertical: 20,
    fontSize: 18,
    color: Colors.DEAFULT_WHITE,

  },
  profileEmail: {
    color: Colors.DEAFULT_WHITE,
    fontSize: 13,
  },
  options: {
    marginTop: 20,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  optionItem: {
    paddingVertical: 20,
    paddingHorizontal: 70,
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    width: "100%",

    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DEFAULT_BLACK,
  },
  optionIcon: {
    paddingHorizontal: 5,
  },
  optionContent: {
    flexDirection: "row",
    backgroundColor: Colors.DEAFULT_BG,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  optionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
