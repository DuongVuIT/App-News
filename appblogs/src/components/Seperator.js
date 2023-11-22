import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
const width = Dimensions.get("window").width - 20;

const Seperator = ({
  width = "100%",
  height = 1,
  backgroundColor = "#d3d3d3",
  style,
}) => {
  return (
    <View
      style={[{ width, height, backgroundColor, alignSelf: "center" }, style]}
    />
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default Seperator;
