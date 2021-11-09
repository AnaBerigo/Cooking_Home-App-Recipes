import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

console.disableYellowBox = true;
import Routes from "./src/routes/index";
import AuthProvider from "./src/contexts/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    );
  }
}
