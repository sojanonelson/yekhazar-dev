import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  RefreshControl,
  DrawerLayoutAndroid,
} from "react-native";
import { Colors, Images } from "../contants";
import {
  Separator,
  ProductItem,
  MyCarousel,
  ProductList,
  Header,
  ProductGrid,
  Badge,
} from "../components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ProductService } from "../services";
import Ionicon from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import NoConnectionScreen from "./NoConnectionScreen";

const HomeScreen = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const [firstCategoryName, setFirstCategoryName] = useState("");
  const [secondCategoryName, setSecondCategoryName] = useState("");
  const [thirdCategoryName, setThirdCategoryName] = useState("");
  const [firstCategoryProducts, setFirstCategoryProducts] = useState([]);
  const [secondCategoryProducts, setSecondCategoryProducts] = useState([]);
  const [thirdCategoryProducts, setThirdCategoryProducts] = useState([]);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const categoryData = useSelector((state) => state.category.category);
 
  const productsData = useSelector((state) => state.product.products);
 
  const cartCount = useSelector((state) => state.cart.count);

  //CONSOLES
  // console.log("🪐TOKEN: ", token);
  // console.log("🪐User Data: ", userData);
  // console.log("🪐Brand Data: ", brandData);
  // console.log("🪐All Product: ", productsData);
  // console.log("🪐Categories: ", categoryData);

  // console.log("🪐FirstCategoryName: ", firstCategoryName);
  // console.log("🪐FirstProduct: ", firstCategoryProducts);

  // console.log("🪐SecondCategoryname: ", secondCategoryName);
  // console.log("🪐SecondCategoryName: ", secondCategoryProducts);

  // console.log("🪐ThirdCategoryName: ", thirdCategoryName);
  // console.log("🪐ThirdCategoryProducts: ", thirdCategoryProducts);

  useEffect(() => {
    if (categoryData.length > 0) {
      const first = categoryData[0];
      setFirstCategoryName(first);

      const second = categoryData[1];
      setSecondCategoryName(second);

      const third = categoryData[2];
      setThirdCategoryName(third);

      fetchProductsByCategory(first, setFirstCategoryProducts);
      fetchProductsByCategory(second, setSecondCategoryProducts);
      fetchProductsByCategory(third, setThirdCategoryProducts);
    }
  }, [categoryData]);

  const fetchProductsByCategory = async (categoryName, setProducts) => {
    try {
      const products = await ProductService.getSingleProductByCategory(
        categoryName
      );
      setProducts(products.products);
      console.log("Products for", categoryName, );
    } catch (error) {
      console.error("Error fetching products {product service}:", error);
    }
  };

  const productRedirect = (id) => {
    navigation.navigate("SingleProduct");
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicon name="menu" size={33} />
        </TouchableOpacity>
        <Text style={styles.title}>YEKHAZAR</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicon name="cart" size={33} />
          <Badge count={cartCount} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
        />
      </View>
      {isConnected ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9Bd35A", "#689F38"]}
              progressBackgroundColor="#FFFFFF"
            />
          }
        >
          <View style={styles.MyCarousel}>
            <MyCarousel />
          </View>
          <View style={styles.first}>
            <View style={styles.newArrivals}>
              <Text style={styles.subTitle}>New Arrivals</Text>
            </View>
            <View>
              <ProductList navigate={navigation} products={productsData} />
            </View>
          </View>
          <View>
            <Image
              source={Images.Ad1}
              resizeMode="contain"
              style={{ width: "100%", height: 200 }}
            />
          </View>

          <View style={styles.first}>
            <View style={styles.newArrivals}>
              <Text style={styles.subTitle}>Best of {firstCategoryName}</Text>
            </View>
            <View>
              <ProductGrid products={firstCategoryProducts} />
            </View>
          </View>

          <View style={styles.first}>
            <View style={styles.newArrivals}>
              <Text style={styles.subTitle}>Best of {secondCategoryName}</Text>
            </View>
            <View style={styles.productRow}>
              <ProductList
                navigate={navigation}
                products={secondCategoryProducts}
              />
            </View>
          </View>

          <View>
            <Image
              source={Images.Ad2}
              resizeMode="contain"
              style={{ width: "100%", height: 200 }}
            />
          </View>

          <View style={styles.first}>
            <View style={styles.newArrivals}>
              <Text style={styles.subTitle}>Best of {thirdCategoryName}</Text>
            </View>
            <View style={styles.productRow}>
              <ProductList
                navigate={navigation}
                products={thirdCategoryProducts}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <NoConnectionScreen />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 8,
    margin: 10,
    fontSize: 16,
  },
  searchBar: {
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.DEAFULT_LIGHT_GREY,
  },
  newArrivals: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 22,

    color: Colors.DEFAULT_GREY,
    backgroundColor: Colors.SUBTITLE_BG,
    paddingVertical: 7,
  },
  MyCarousel: {
    paddingVertical: 10,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  drawerButton: {
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
    borderWidth: 2,
    borderColor: Colors.DEFAULT_GREY,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DEFAULT_BLACK,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DEAFULT_BG,
    marginVertical: 10,
  },
  drawerText: {
    fontSize: 14,
  },
  drawerProfileText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  drawerCategory: {
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightcoral",
    borderColor: "lightcoral",
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
  space: {
    padding: 20,
  },
  productRow: {
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
  },
});
