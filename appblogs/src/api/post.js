import client from "./client";

export const getFeaturedPosts = async () => {
  try {
    const { data } = await client("/post/featured-posts");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const getLastestPost = async (limit, pageNo) => {
  try {
    const { data } = await client(`/post/posts?limit=${limit}&page=${pageNo}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const getSinglePost = async (slug) => {
  try {
    const { data } = await client(`/post/single/${slug}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
