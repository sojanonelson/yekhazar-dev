import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { setSelectedProduct } from "../redux/slices/GeneralSlice";
import ProductService, { getSingleProductBySlug } from "../services/ProductService";
import { useDispatch } from "react-redux";
const ProductRow = ({ products }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const selectedProduct = async (slug) => {
    console.log("GRIDD", slug);
    console.log("Selected slug: ", slug);
    try {
      const response = await ProductService.getSingleProductBySlug(slug);
      dispatch(setSelectedProduct(response.data.product));
      console.log("response: ", response.data);

      navigation.navigate("ProductDetail");
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };
  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <TouchableOpacity
          onPress={() => selectedProduct(product.slug)}
          key={index}
        >
          <View key={index} style={styles.productContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{product.brand.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ProductGrid = ({ products }) => {
  const chunkSize = 3;
  const chunks = products.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  const lastRowIncomplete =
    chunks.length > 0 && chunks[chunks.length - 1].length < chunkSize;

  return (
    <View>
      {chunks.map(
        (chunk, index) =>
          !(index === chunks.length - 1 && lastRowIncomplete) && (
            <ProductRow key={index} products={chunk} />
          )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginBottom: 5,
  },
  productContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  image: {
    width: 130,
    height: 200,
    borderTopLeftRadius: 10, // Adjust the curve radius as needed
    borderTopRightRadius: 10,

    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductGrid;