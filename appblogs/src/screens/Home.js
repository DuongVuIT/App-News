import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getFeaturedPosts, getLastestPost, getSinglePost } from "../api/post";
import PostItemList from "../components/PostItemList";
import Seperator from "../components/Seperator";
import Slider from "../components/Slider";
let pageNo = 0;
const limit = 50;

export default function Home({ navigation }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [lastest, setLastest] = useState([]);
  // const [reachedToEnd, setReachedToEnd] = useState(false);
  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);
    console.log(posts);
    setFeaturedPosts(posts);
    console.log(featuredPosts);
  };
  const fetchLastestPost = async () => {
    const { error, posts } = await getLastestPost(limit, pageNo);
    if (error) return console.log(error);
    setLastest(posts);
  };
  // const fetchMorePosts = async () => {
  //   if (reachedToEnd || busy) return;
  //   pageNo += 1;
  //   setBusy(true);
  //   const { error, posts, postCount } = await getLastestPost(limit, pageNo);
  //   setBusy(false);
  //   if (error) return console.log(error);
  //   if (postCount === lastest.length) return setReachedToEnd(true);
  //   setLastest((prevLastest) => [...prevLastest, ...posts]);
  // };
  // const handleEndReached = () => {
  //   // Kiểm tra nếu người dùng đã cuộn đến cuối danh sách
  //   if (!fetching) {
  //     fetchMorePosts();
  //   }
  // };
  useEffect(() => {
    fetchFeaturedPosts();
    fetchLastestPost();
  }, []);
  const ListHeaderComponent = () => {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight }}>
        {featuredPosts.length ? (
          <Slider
            onSliderPress={fetchSinglePost}
            data={featuredPosts}
            title="Featured Posts"
          />
        ) : null}
        <View style={{ marginTop: 15 }}>
          <Seperator />
          <Text
            style={{
              fontWeight: "700",
              color: "#383838",
              fontSize: 22,
              marginTop: 15,
            }}
          >
            Latest Posts
          </Text>
        </View>
      </View>
    );
  };
  const fetchSinglePost = async (postInfo) => {
    const slug = postInfo.slug || postInfo;
    const { error, post } = await getSinglePost(slug);
    if (error) console.log(error);
    navigation.navigate("Details", { post });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostItemList onPress={() => fetchSinglePost(item.slug)} post={item} />
      </View>
    );
  };
  const ItemSeparatorComponent = () => (
    <Seperator width="90%" style={{ marginTop: 15 }} />
  );
  return (
    <FlatList
      data={lastest}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 15 }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      // onEndReached={handleEndReached}
      // onEndReachedThreshold={0}
    />
  );
}
