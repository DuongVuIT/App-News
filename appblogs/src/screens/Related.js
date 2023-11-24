import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getSimilarPosts } from "../api/post";
import PostItemList from "../components/PostItemList";

const Related = ({ postId, handleOnPress }) => {
  const [posts, setPosts] = useState([]);

  const fetchSimilarPost = async () => {
    const { error, posts } = await getSimilarPosts(postId);
    if (error) return console.log(error);
    setPosts([...posts]);
  };
  useEffect(() => {
    fetchSimilarPost();
  }, [postId]);
  return posts.map((post) => {
    return (
      <View key={post.id}>
        <PostItemList onPress={() => handleOnPress(post.slug)} post={post} />
      </View>
    );
  });
};

export default Related;

const styles = StyleSheet.create({
  container: {},
});
