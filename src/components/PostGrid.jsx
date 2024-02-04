import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostGrid = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // get all posts from the api
    const getPosts = async () => {
      try {
        const posts = await fetch(
          import.meta.env.VITE_API_ENTRY_POINT + "/posts",
        );
        const postsData = await posts.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="post-grid">
      {console.log(posts)}
      {posts.map((post) => (
        <PostCard key={post._id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default PostGrid;
