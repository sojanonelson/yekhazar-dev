import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { setSelectedProduct } from "../redux/slices/GeneralSlice";
import { Separator, Badge, ProductList } from "../components";
import { Colors, Images } from "../contants";
import { ProductService } from "../services";
import { Display } from "../utils";

const SingleCategory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector((state) => state.general.showcaseProduct);
  const cartCount = useSelector((state) => state.cart.count);
  const [selectedOption, setSelectedOption] = useState("Newest first");
  const [refreshing, setRefreshing] = useState(false);
  const [sortedProduct,setSortedProducts] = useState(products)

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleSortingOptionClick = (option) => {
    setSelectedOption(option);
  };

  console.log("Sorted product:", sortedProduct)

  const selectedProduct = (product) => {
    dispatch(setSelectedProduct(product));
    console.log("Selected Product: ", product);
    navigation.navigate("ProductDetail");
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => selectedProduct(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.productInfo}>{item.description}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (selectedOption === "Newest first") {
      const sortedByDate = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedProducts(sortedByDate);
    } else if (selectedOption === "Low to high") {
      const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
      setSortedProducts(sortedByPrice);
    } else if (selectedOption === "High to low") {
      const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
      setSortedProducts(sortedByPrice);
    }
  }, [selectedOption, products]);

  return (

    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEAFULT_BG}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicon name="menu" size={33} />
        </TouchableOpacity>
        <Text style={styles.title} onPress={() => navigation.navigate("Home")}>
          YEKHAZAR
        </Text>
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
      <View style={styles.filterContainer}>
        <Text>Sort By</Text>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedOption === "Newest first" && styles.selected,
          ]}
          onPress={() => handleSortingOptionClick("Newest first")}
        >
          <Text
            style={[
              styles.filterBtnText,
              selectedOption === "Newest first" && styles.selectedText,
            ]}
          >
            Newest first
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedOption === "Low to high" && styles.selected,
          ]}
          onPress={() => handleSortingOptionClick("Low to high")}
        >
          <Text
            style={[
              styles.filterBtnText,
              selectedOption === "Low to high" && styles.selectedText,
            ]}
          >
            Low to high
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedOption === "High to low" && styles.selected,
          ]}
          onPress={() => handleSortingOptionClick("High to low")}
        >
          <Text
            style={[
              styles.filterBtnText,
              selectedOption === "High to low" && styles.selectedText,
            ]}
          >
            High to low
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      horizontal='false'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#9Bd35A", "#689F38"]}
          progressBackgroundColor="#FFFFFF"
        />
      }
    >

      {/* <FlatList
        data={sortedProduct}
        numColumns={2}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#FFFFFF"
          />
        }
      /> */}
      <View>
        <ProductList products={sortedProduct} navigation={navigation}/>
      </View>
      </ScrollView>
    </View>
    
  );
};

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
    paddingBottom: 0,
    borderBottomWidth: 3,
    borderBottomColor: Colors.DEAFULT_LIGHT_GREY,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 2,
    paddingBottom: 5,
    borderRadius: 10,
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
  },
  filterBtnText: {
    fontSize: 16,
    color: Colors.DEAFULT_BG,
    fontWeight: "bold",
  },
  productItem: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    marginBottom: 25,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.DEAFULT_BG,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  productInfo: {
    fontSize: 14,
    color: "#444",
  },
});

export default SingleCategory;
