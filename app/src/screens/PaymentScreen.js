import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";

import { useSelector } from "react-redux";

const PaymentScreen = () => {
  const paymentKey = useSelector((state) => state.general.paymentKey);
  const orderId = useSelector((state) => state.general.orderId);
  const paymentAmount = useSelector((state) => state.general.paymentAmount);

  console.log("📦Payment Key:", paymentKey);
  console.log("📦Order ID:", orderId);
  console.log("📦Payment Amount:", paymentAmount);

  // const handlePayment = async () => {
  //   if (!paymentKey) {
  //     console.log("Payment key is missing or invalid");
  //     return;
  //   }

  //   const options = {
  //     description: "Credits towards consultation",
  //     image: "https://i.imgur.com/3g7nmJC.jpg",
  //     currency: "INR",
  //     key: paymentKey,
  //     amount: paymentAmount * 100, // converting amount to paise
  //     name: "YEKHAZAR",
  //     order_id: orderId,
  //     prefill: {
  //       email: "business.deeze@gmail.com",
  //       contact: "9191919191",
  //       name: "Admin Batman Here",
  //     },
  //     theme: { color: "red" },
  //   };

  //  await RazorpayCheckout.open(options)
  //     .then((data) => {
  //       console.log("Payment Successful:", data);
  //       Alert.alert("Payment Successful", `ID: ${data.razorpay_payment_id}`);
  //     })
  //     .catch((error) => {
  //       console.log("Error in Razorpay payment:", error);
  //       Alert.alert("Payment Error", `${error.code} | ${error}`);
  //     });
  // };

  return (
    <View style={styles.container}>
      <TouchableHighlight>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </View>
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
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
