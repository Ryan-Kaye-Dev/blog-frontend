import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const PostCard = ({ title, content, author }) => {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Author: {author}</p>
      <button> View Post</button>
    </div>
  );
};

export default PostCard;
