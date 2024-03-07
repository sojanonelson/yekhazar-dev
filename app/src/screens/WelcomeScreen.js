import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors, General } from "../contants";
import { WelcomeCard, Separator } from "../components";
import { Display } from "../utils";

const pageStyle = (isActive) =>
  isActive ? styles.page : { backgroundColor: Colors.DEFAULT_GREY };

const Pagination = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {General.WELCOME_CONTENTS.map((_, i) => (
        <View
          key={i}
          style={[
            styles.page,
            {
              backgroundColor: i === index ? "blue" : "grey",
            },
          ]}
        />
      ))}
    </View>
  );
};
const WelcomeScreen = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();

  const onViewRef = useRef((changed) => {
    setWelcomeListIndex(changed.viewableItems[0]?.index || 0);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Colors.PRIMARY_BG}
      />
      <Separator height={StatusBar.currentHeight} />

      <View style={styles.welcomeListConatiner}>
        <FlatList
          data={General.WELCOME_CONTENTS}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <WelcomeCard {...item} />}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          ref={welcomeList}
        />
      </View>

      <Separator height={Display.setHeight(1)} />

      <Pagination index={welcomeListIndex} />

      <Separator height={Display.setHeight(8)} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          
          style={styles.gettingStartedButton}
        >
          <Text style={styles.gettingStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: 9 }}>
            <Text
              style={styles.buttonText}
              onPress={() => welcomeList.current.scrollToEnd()}
            >
              SKIP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => pageScroll()}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEAFULT_WHITE,
  },
  welcomeListConatiner: {
    height: Display.setHeight(60),
  },
  pageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.PRIMARY_BG,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Display.setWidth(90),
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,

    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: Colors.DEFAULT_BLUE,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_BLUE,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: "white",
    lineHeight: 20 * 1.4,
  },
});

export default WelcomeScreen;
