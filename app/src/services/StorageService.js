import AsyncStorage from "@react-native-async-storage/async-storage";

const setFirstTimeUse = async () => {
  try {
    await AsyncStorage.setItem("isFirstTimeUse", "true");
  } catch (error) {
    console.error("Error setting first time use:", error);
  }
};


const storeUserData = async (response) => {
    try {
      const { token, user } = response; 
  
      
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
  
      console.log("User credentials stored successfully.");
    } catch (error) {
      console.error("Error storing user credentials:", error);
    }
  }

  const localUserData = async () => {
    try {
     
      const token = await AsyncStorage.getItem("token");
      const userDataString = await AsyncStorage.getItem("user");

  
    
      const userData = JSON.parse(userDataString);
      
  
      return { token, userData };
    } catch (error) {
      console.error("Error retrieving user credentials:", error);
      return null;
    }
  };

const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage data cleared successfully.");
  } catch (error) {
    console.error("Error clearing AsyncStorage data:", error);
  }
};

const displayAllData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const keyValuePairs = await AsyncStorage.multiGet(allKeys);

    console.log("All AsyncStorage data:");

    keyValuePairs.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error("Error displaying AsyncStorage data:", error);
  }
};

export { setFirstTimeUse, clearAllData, displayAllData,storeUserData,localUserData }; 
