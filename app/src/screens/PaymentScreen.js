import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import RazorpayCheckout from 'react-native-razorpay';

import { useSelector } from "react-redux";

const PaymentScreen = () => {
  const paymentKey = useSelector((state) => state.general.paymentKey);
  const orderId = useSelector((state) => state.general.orderId);
  const paymentAmount = useSelector((state) => state.general.paymentAmount);

  console.log("📦Payment Key:", paymentKey);
  console.log("📦Order ID:", orderId);
  console.log("📦Payment Amount:", paymentAmount);

  const handlePayment = async () => {
    console.log("Payment started");
    if (!paymentKey) {
      console.log("Payment key is missing or invalid");
      return;
    }

    const options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: paymentKey,
      amount: paymentAmount * 100,
      name: "YEKHAZAR",
      order_id: orderId,
      prefill: {
        email: "business.deeze@gmail.com",
        contact: "9191919191",
        name: "Admin Batman Here",
      },
      theme: { color: "red" },
    };

    await RazorpayCheckout.open(options)
      .then((data) => {
        console.log("Payment Successful:", data);
        console.log("Payment Successfulllllllll");
        console.log("Payment Successfulllllllll");
        console.log("Payment Successfulllllllll");
        Alert.alert("Payment Successful", `ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        console.log("Error in Razorpay payment:", error);
        Alert.alert("Payment Error", `${error.code} | ${error}`);
      });
  };

  const hello = async () => {
    console.log("Payment started");
    if (!paymentKey) {
      console.log("Payment key is missing or invalid");
      return;
    }

    try {
      const options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.jpg",
        currency: "INR",
        key: paymentKey,
        amount: paymentAmount * 100,
        name: "YEKHAZAR",
        order_id: orderId,
        prefill: {
          email: "business.deeze@gmail.com",
          contact: "9191919191",
          name: "Admin Batman Here",
        },
        theme: { color: "red" },
      };

      await RazorpayCheckout.open(options)
        .then((data) => {
          console.log("Payment Successful:", data);
          console.log("Payment Successfulllllllll");
          console.log("Payment Successfulllllllll");
          console.log("Payment Successfulllllllll");
          Alert.alert("Payment Successful", `ID: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          console.log("Error in Razorpay payment:", error);
          Alert.alert("Payment Error", `${error.code} | ${error}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight>
        <TouchableOpacity onPress={() => hello()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    cursor: "pointer",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
