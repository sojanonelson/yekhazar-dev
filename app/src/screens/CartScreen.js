import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Colors, Images } from "../contants";
import { Separator } from "../components";
import Ioncion from "@expo/vector-icons/Ionicons";
import { CartService, ProductService, OrderService } from "../services";
import {
  setCartId,
  setOrderId,
  setPaymentAmount,
  setPaymentKey,
  setSelectedProduct,
} from "../redux/slices/GeneralSlice";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem } from "../redux/slices/CartSlice";
import { Display } from "../utils";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Isloading, setIsLoading] = useState();
  const userId = useSelector((state) => state.user.user.id);
  const token = useSelector((state) => state.user.user.token);
  const cartItems = useSelector((state) => state.cart.items);
  const paymentKey = useSelector((state) => state.general.paymentKey);

  const cartId = useSelector((state) => state.cart.cartId);

  console.log("📦Cart Screen:", cartItems);
  console.log("📦UserID:", userId);
  console.log("📦Token:", token);

  const transformedProducts = cartItems.map((item) => ({
    quantity: item.productCount,
    price: item.product.price,
    taxable: item.product.taxable,
    product: item.product._id,
  }));

  console.log("Transformed Productss:", transformedProducts);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.productCount,
    0
  );

  const placeOrder = async () => {
    try {
      const transformedProducts = cartItems.map((item) => ({
        quantity: item.productCount,
        price: item.product.price,
        taxable: item.product.taxable,
        product: item.product._id,
      }));
      const getCardId = await CartService.getCartId(transformedProducts, token);
      dispatch(setCartId(getCardId.cartId));
      console.log("Cartt Id:", getCardId.cartId);

      if (!cartId) {
        const getPaymentKey = await OrderService.getPaymentKey().then((res) => {
          console.log("Payment Key:", res.key);
          dispatch(setPaymentKey(res.key));
        });
      }

      const createPaymentOrder = await OrderService.createPaymentOrder(
        totalPrice
      );
      dispatch(setOrderId(createPaymentOrder.id));
      console.log("Payment Order:", createPaymentOrder);
      dispatch(setPaymentAmount(totalPrice));

      navigation.navigate("PaymentScreen");
    } catch (error) {
      console.log("Error placing order: ", error);
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const handleDeleteItem = (item) => {
    console.log("⭕️Removing:", item.product.name);
    dispatch(removeItem({ _id: item.product._id }));
  };

  const selectedProduct = async (slug) => {
    setIsLoading(true);
    try {
      const response = await ProductService.getSingleProductBySlug(slug);
      dispatch(setSelectedProduct(response.data.product));
      navigation.navigate("ProductDetail");
    } catch (error) {
      console.error("Error fetching product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectedProduct(item.product.slug)}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.product.imageUrl }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product.name}</Text>

          <Text style={styles.itemPrice}>₹{item.product.price}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.productCount}</Text>
          <Text style={styles.itemName}>{item.productBrand}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item)}
        >
          <Ioncion name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Separator height={30} />
      <View style={styles.headerContainer}>
        <Ioncion
          name="chevron-back-outline"
          size={30}
          style={styles.goback}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.header}>Your Cart</Text>
      </View>

      {cartItems && cartItems.length > 0 ? (
        <Text>products:</Text>
      ) : (
        <>
          <View style={styles.noProduct}>
            <Image style={styles.noProductImage} source={Images.NOCART} />
          </View>
          <Text style={styles.noProductText}>No products</Text>
        </>
      )}

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => (item ? item.product._id.toString() : "")}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>₹{totalPrice}</Text>
      </View>

      {cartItems && cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={clearCartHandler}
        >
          <Text style={styles.checkoutButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      )}

      {cartItems && cartItems.length > 0 ? (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => placeOrder()}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.checkoutButtonText}>Go To Shop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  checkoutButton: {
    backgroundColor: Colors.SECONDARY_BG,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  goback: {
    paddingRight: 20,
  },
  deleteButton: {
    padding: 2,
  },
  noProduct: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    padding: 30,

    paddingVertical: 0,
  },
  noProductImage: {
    width: Display.setWidth(80),
    height: Display.setHeight(30),
  },
  noProductText: {
    textAlign: "center",
  },
});

export default CartScreen;