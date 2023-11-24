import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator();
const NativeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: "", header: () => null }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: (props) => (
            <TouchableOpacity onPress={() => navigation.goBack()} {...props}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  );
};

export default NativeStack;

const styles = StyleSheet.create({});
