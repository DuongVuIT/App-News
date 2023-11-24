import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../screens/Search";
import NativeStack from "./NativeStack";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
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
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
