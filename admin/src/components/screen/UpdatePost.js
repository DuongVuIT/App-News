import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationProvider";
import NotFound from "./NotFound";
import { getPost, updatePost } from "../../api/post";
export default function UpdatePost() {
  const { updateNotification } = useNotification();
  const [postInfo, setPostInfo] = useState();
  const [notFound, setNotfound] = useState(false);
  const { slug } = useParams();
  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotfound(true);
      return updateNotification("error", error);
    }
    console.log(post);
    setPostInfo({ ...post, tags: post?.tags?.join(", ") });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const handleSubmit = async (data) => {
    const { error, post } = await updatePost(postInfo.id, data);
    if (error) return updateNotification("error", error);
    setPostInfo({ ...post, tags: post?.tags?.join(", ") });
  };
  if (notFound) return <NotFound />;
  return (
    <PostForm
      onSubmit={handleSubmit}
      PostInit={postInfo}
      postBtnTitle="Update"
    />
  );
}
