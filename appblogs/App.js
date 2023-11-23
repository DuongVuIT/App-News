import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
const CUSTOM_THEME = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#fff" },
};
const App = () => {
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
