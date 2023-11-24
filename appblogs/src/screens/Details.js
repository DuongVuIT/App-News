import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import React from "react";
import dateFormat from "dateformat";
import Related from "./Related";
import Seperator from "../components/Seperator";
import { getSinglePost } from "../api/post";
const { width } = Dimensions.get("window");
const Details = ({ route, navigation }) => {
  const post = route.params?.post;
  if (!post) return null;
  const getImage = (uri) => {
    if (uri) return { uri };
    return require("../../assets/eugene-golovesov-y6OwxwYKSQE-unsplash.jpg");
  };
  const handleSinglePostFetch = async (slug) => {
    const { error, post } = await getSinglePost(slug);
    if (error) return console.log(error);
    navigation.push("Details", { post });
  };
  const { title, thumbnail, tags, createdAt, author, content } = post;
  return (
    <ScrollView>
      <Image
        source={getImage(thumbnail)}
        style={{ width, height: width / 1.7 }}
      />
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontWeight: "700",
            color: "#383838",
            fontSize: 22,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 3,
          }}
        >
          <Text style={{ color: "#827E7E" }}>By {author}</Text>
          <Text style={{ color: "#827E7E" }}>
            {dateFormat(createdAt, "mediumDate")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text selectable style={{ color: "#827E7E" }}>
            Tags
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {tags.map((tag, index) => (
              <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
        <Markdown style={styles}>{content}</Markdown>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#383838",
            textAlign: "center",
            marginBottom: 10,
            fontSize: 22,
          }}
        >
          Related Posts
        </Text>
        <Seperator width="100%" />
        <View style={{ marginTop: 10 }}>
          <Related handleOnPress={handleSinglePostFetch} postId={post.id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  paragraph: {
    lineHeight: 22,
    color: "#545050",
    textAlign: "justify",
    letterSpacing: 0.8,
  },
  body: {
    fontSize: 16,
  },
  link: {
    color: "#7784f8",
  },
});
