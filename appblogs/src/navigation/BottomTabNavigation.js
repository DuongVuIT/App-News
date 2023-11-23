import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import NativeStack from "./NativeStack";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
          headerShown: false,
        }}
        name="Home"
        component={NativeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="search" size={size} color={color} />;
          },
          headerShown: false,
        }}
        name="Settings"
        component={Search}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
