import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  BackHandler,
  RefreshControl,
  
  Vibration,
} from "react-native";
import { Colors, Images } from "../contants";
import { Separator, Badge, ReviewCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicon from "@expo/vector-icons/Ionicons";

import { Display } from "../utils";
import { addItem } from "../redux/slices/CartSlice";
import { localUserData } from "../services/StorageService";

const ProductDetail = () => {

  const [userData,setUserData]= useState(null)

useEffect(()=>{

  const fetchData = async () =>{
      try{

        const {userData} = await localUserData()
        console.log("UUU", userData )
        setUserData(userData)

      }catch(err){
        console.log(err)
      }
    }

    fetchData()

   },[])   


  const selectedProduct = useSelector((state) => state.general.selectedProduct);
  const selectedProductReview = useSelector(
    (state) => state.general.selectedProductReview
  );
  console.log("📦 SelectedProduct:", selectedProduct.name);
  console.log("📦 SelectedProduct REVIEW:", selectedProductReview);
  console.log("📦 SelectedProduct Stock:", selectedProduct.quantity);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [quantity, setQuantity] = useState(1);
 
  const [buttonText, setButtonText] = useState("Add to Cart");
  const cartCount = useSelector((state) => state.cart.count);
  const cartProduct = useSelector((state) => state.cart.items);

  const [productToAdd, setProductToAdd] = useState({
    product: [],
    productCount: null,
    productBrand: null,
  });
  const randomColor = () => {

    const colors = ["FDBF60", "#FF8911", "#7F27FF", "#D37676", "#535C91"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  console.log("📦 CartCount:", cartCount);
  console.log("📦 CartProduct:", cartProduct[0]);
  console.log("📦 ProductToAdd:", productToAdd);
  console.log("📦 Quantity:", quantity);

  const onRefresh = () => {
    setQuantity(1);
    setRefreshing(true);
    setButtonText("Add to Cart");

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const productsData = useSelector((state) => state.product.products[0]);
  // const userData = useSelector((state) => state.user.user.user);
 
  const categoryData = useSelector((state) => state.category.category);


  const incrementQuantity = () => {
    if (quantity < selectedProduct.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log("📦 UserData:", userData);
  console.log("📦 AllCategory:", categoryData);
  console.log("📦 ProductDeatils:", productsData.imageUrl);

  const drawerRef = useRef(null);
  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const handleAddToCart = () => {
    setButtonText("Go to Cart");
    Vibration.vibrate(10 * 10);

    dispatch(
      addItem({
        product: selectedProduct,
        productCount: quantity,
        productBrand: selectedProduct.brand.name,
      })
    );

    setQuantity(1);
    navigation.navigate("Cart");
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

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
        <Text onPress={() => navigation.navigate("Home")} style={styles.title}>
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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        <View>
          <View style={styles.Detail}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{
                uri: selectedProduct.imageUrl,
              }}
            />
            
          </View>
          <View style={styles.productInfo}>
            <TouchableOpacity>
              <Text style={styles.productBrand}>
                {selectedProduct.brand.name}
              </Text>
            </TouchableOpacity>
            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productPrice}>₹{selectedProduct.price}</Text>

            <View style={styles.quantity}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.productDescription}>Product Description</Text>
            <Text style={styles.productDescriptionText}>
              {selectedProduct.description}
            </Text>
          </View>
        </View>

        {/* ReviewSection */}
        <View style={styles.reviewSection}>
          <View style={styles.reviewHead}>
            <Text style={styles.reviewTitle}>Reviews & Ratings</Text>
            <TouchableOpacity
              style={styles.addReviewButtton}
              
            >
              <Text style={styles.addReviewButttonText}>Rate this product</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewBody}>
            {selectedProductReview.length === 0 ? (
              <View style={styles.reviewNoData}>
                <Ionicon
                  style={styles.addToCartButtonIcon}
                  color={"black"}
                  name="chatbubbles-outline"
                  size={24}
                />
                <Text style={styles.reviewNoDataText}>
                  There's no review available for this product
                </Text>
              </View>
            ) : (
              selectedProductReview.map((review) => (
                <View style={styles.reviewView} key={review._id}>
                  <View style={styles.reviewCardHead}>
                    <View style={styles.reviewCardSection}>
                      <View
                        style={[
                          styles.profileInitial,
                          { backgroundColor: randomColor() },
                        ]}
                      >
                        <Text style={styles.profileInitialText}>
                          {review.user.firstName
                            ? review.user.firstName.charAt(0).toUpperCase()
                            : ""}
                        </Text>
                      </View>
                      <View>
                        <View>
                          <Text style={styles.reviewCardTitle}>
                            {review.title}
                          </Text>
                          <View style={styles.starContainer}>
                            {[...Array(5)].map((_, index) => (
                              <Ionicon
                                key={index}
                                name="star"
                                color={
                                  index < review.rating ? "orange" : "gray"
                                }
                                size={15}
                              />
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewCardRating}>
                      {formatDate(review.created)}
                    </Text>
                  </View>
                  <View style={styles.reviewCardBody}>
                    <Text style={styles.reviewCardReview}>{review.review}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>{buttonText}</Text>
        <Ionicon
          style={styles.addToCartButtonIcon}
          color={"white"}
          name="bag-add-outline"
          size={24}
        />
      </TouchableOpacity>
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
  MyCarousel: {
    paddingVertical: 10,
  },
  drawerContent: {
    flex: 1,
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
  image: {
    height: Display.setHeight(50),
    width: Display.setWidth(100),
  },
  Detail: {
    justifyContent: "center",
    alignItems: "center",

  },

  productInfo: {
    padding: 10,
    paddingHorizontal: 20,
    borderTopWidth: 3,
    borderTopColor: Colors.DEAFULT_LIGHT_GREY,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.GREY,
  },
  productName: {
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productDescriptionText: {
    fontSize: 16,
  },
  productDescription: {
    fontWeight: "700",
    paddingTop: 15,
  },
  addToCartButton: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 20,
  },
  addToCartButtonText: {
    color: "white",

    fontSize: 18,
  },
  addToCartButtonIcon: {
    marginLeft: 5,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 1,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 2,

    backgroundColor: Colors.DEAFULT_BG,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonText: {
    fontSize: 20,
    color: Colors.DEAFULT_WHITE,
  },

  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    color: Colors.DEFAULT_BLACK,
  },

  reviewSection: {
    marginTop: 20,
    padding: 2,
  },
  reviewHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  addReviewButtton: {
    backgroundColor: Colors.DEAFULT_WHITE,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: Colors.DEAFULT_BG,
    borderWidth: 1,

    padding: 9,
  },
  addReviewButttonText: {
    color: Colors.DEAFULT_BG,

    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_BLACK,
    padding: 10,
  },
  reviewBody: {
    padding: 8,
  },

  reviewCardImage: {
    width: 40,
    height: 40,
  },
  reviewCardHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  reviewCardBody: {
    paddingHorizontal: 10,
  },
  reviewCardSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewCardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  reviewView: {
    backgroundColor: Colors.DEAFULT_LIGHT_GREY,
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  starContainer: {
    flexDirection: "row",
  },
  reviewNoData: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewNoDataText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  profileInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileInitialText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});

export default ProductDetail;
