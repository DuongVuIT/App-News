import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../../api/post";
import PostCard from "./PostCard";
import { useSearch } from "../../context/SearchProvider";
import { useNotification } from "../../context/NotificationProvider";

let pageNo = 0;
const POST_LIMIT = 9;
const getPaginationCount = (length) => {
  const devision = length / POST_LIMIT;
  if (devision % 1 !== 0) {
    return Math.floor(devision) + 1;
  }
  return devision;
};
export default function Home() {
  const { updateNotification } = useNotification();
  const [posts, setPosts] = useState([]);
  const { searchResult } = useSearch();
  const [totalPostcount, setTotalPostCount] = useState([]);
  const pagninationCount = getPaginationCount(totalPostcount);
  const paginationArr = new Array(pagninationCount).fill("");
  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
    if (error) return updateNotification("error", error);
    setPosts(posts);
    setTotalPostCount(postCount);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };
  const handleDelete = async ({ id }) => {
    const confimed = window.confirm("Are you sure!");
    if (!confimed) return;
    const { error, message } = await deletePost(id);
    if (error) return updateNotification("error", message);
    updateNotification("success", message);
    const newPosts = posts.filter((p) => p.id !== id);
    setPosts(newPosts);
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {searchResult.length
          ? searchResult.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })
          : posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })}
      </div>
      {paginationArr.length > 1 && !searchResult.length ? (
        <div className="py-5 flex justify-center items-center space-x-3">
          {paginationArr.map((_, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => fetchMorePosts(index)}
                  className={
                    index === pageNo
                      ? "text-blue-500 border-b-2 border-b-blue-500"
                      : "text-gray-500"
                  }
                >
                  {index + 1}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
