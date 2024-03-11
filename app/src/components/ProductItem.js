import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Colors, Images } from "../contants";
import { useNavigation } from "@react-navigation/native";
import { ProductService, UserService } from "../services";
import { useDispatch } from "react-redux";
import {
  setSelectedProductReview,
  setSelectedProduct,
} from "../redux/slices/GeneralSlice";

const ProductItem = ({ name, price, imageUrl, brand, id, info, slug }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleImageLoad = () => {
    setIsLoadingImage(false);
  };

  const selectedProduct = async () => {
    setIsLoading(true);
    setIsLoadingImage(true)
    try {
      const response = await ProductService.getSingleProductBySlug(slug);
      const review = await UserService.getReview(slug);
      dispatch(setSelectedProduct(response.data.product));
      dispatch(setSelectedProductReview(review.reviews));
      console.log("Selected product reviews:", review.reviews);
      navigation.navigate("ProductDetail");
      setIsLoadingImage(false)
    } catch (error) {
      console.error("Error fetching product: ", error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => selectedProduct(slug)}
      disabled={isLoading}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            onLoad={handleImageLoad}
          />
          {isLoadingImage && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={Colors.DEAFULT_BG} />
            </View>
          )}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "49%",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.84,
      },
      android: {
        elevation: 3,
      },
    }),
    backgroundColor: "#fff", // Set background color to ensure shadow appears
  },
  imageContainer: {
    position: "relative",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 250,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEAFULT_BG,
  },
});

export default ProductItem;
