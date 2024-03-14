import React, { useState } from "react";
import { StatusBar } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Separator, SettingsHeader } from "../components";
import { Colors } from "../contants";
import { UserService } from "../services";
import { useSelector } from "react-redux";

const ReviewAddScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const token = useSelector((state) => state.user.token);
  const productID = useSelector((state) => state.general.selectedProduct._id);

  const handleSubmitReview = async () => {
    setIsLoading(true);
    try {
      const submitReview = await UserService.addReview(
        productID,
        title,
        review,
        rating,
        isRecommended,
        token
      );
      console.log("Submit Review:", submitReview);
    } catch (err) {
      console.log(err);
    }

    console.log("Title:", title);
    console.log("Review:", review);
    console.log("Rating:", rating);
    console.log("Recommended:", isRecommended);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.header}>
        <Ionicon
          name="chevron-back-outline"
          color="black"
          size={33}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Write a Review</Text>
      </View>
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Review"
          multiline
          value={review}
          onChangeText={setReview}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating (1-5)"
          keyboardType="numeric"
          value={rating}
          onChangeText={(value) => setRating(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRecommended(!isRecommended)}
        >
          <Text style={styles.buttonText}>
            {isRecommended ? "Unrecommend" : "Recommend"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitReview}
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#066e87",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  header: {
    backgroundColor: Colors.DEAFULT_WHITE,
    padding: 20,
    paddingTop: 20,

    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: "black",
  },
});

export default ReviewAddScreen;
