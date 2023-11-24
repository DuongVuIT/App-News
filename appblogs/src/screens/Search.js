import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import PostItemList from "../components/PostItemList";
import { getSinglePost, searchPost } from "../api/post";
export default function Search() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const handleOnSubmit = async () => {
    if (!query.trim()) return;
    const { error, posts } = await searchPost(query);
    if (error) return console.log(error);
    setResult([...posts]);
    console.log(result);
  };
  const handlePost = async (slug) => {
    const { error, post } = await getSinglePost(slug);
    if (error) return console.log(error);
    navigation.navigate("Details", { post });
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search ...."
        style={styles.searchInput}
        onSubmitEditing={handleOnSubmit}
      />
      <ScrollView>
        {result.map((post) => {
          return (
            <View style={{ marginTop: 10 }} key={post.id}>
              <PostItemList post={post} onPress={() => handlePost(post.slug)} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: Constants.statusBarHeight,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
});
