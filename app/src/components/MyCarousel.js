import React, { useRef, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../contants";
// Dummy image URLs
const imageUrls = [Images.BANNER1, Images.BANNER2, Images.BANNER3];

const MyCarousel = () => {
  return (
    
      <Carousel
        width={500}
        height={200}
        loop
        pagingEnabled
        autoPlay
        autoPlayInterval={3000}
        data={imageUrls}
        renderItem={({ item }) => (
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Image style={{ width: "100%",justifyContent:'center',alignItems:'center', height: "100%" }} source={item} />
          </View>
        )}
      />
    
  );
};

export default MyCarousel;
