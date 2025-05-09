import React, { useState } from "react";
import "../assets/styles/feed.css";
import Sidebar from "../components/Sidebar";

const Feed = () => {
  const [postContent, setPostContent] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 101,
      username: "HanifAnonim",
      createdAt: "2 jam lalu",
      content:
        "Why are the poorest states in America nearly all Republican? Why are the richest states nearly all Democrat?",
      replies: [
        {
          id: 11,
          userId: 202,
          username: "PhillyBuck",
          createdAt: "1 jam lalu",
          content:
            "Aren't the poorest republican states highest on the welfare list? They detest the people who are keeping their lights on.",
        },
      ],
    },
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() === "") return;

    const newPost = {
      id: Date.now(),
      userId: 999, // bisa diganti sesuai user login
      username: "Hai, Hanifan!",
      createdAt: "baru saja",
      content: postContent,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  return (
    <div className="app-container feed-page">
      <Sidebar />
      <main className="main-content">
        {/* Post Input */}
        <div className="create-post-container">
          <form onSubmit={handlePostSubmit} className="create-post-form">
            <input
              type="text"
              className="create-post-input"
              placeholder="Apa ceritamu hari ini?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <button type="submit" className="create-post-button">
              Unggah
            </button>
          </form>
        </div>

        {/* Posts */}
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-avatar">{post.username[0]}</div>
                <div>
                  <div className="post-author">{post.username}</div>
                  <div className="post-time">{post.createdAt}</div>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-footer">
                <button className="post-reply-button">
                  {post.replies.length} Balasan
                </button>
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div className="replies-section">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="reply-card">
                      <div className="reply-header">
                        <div className="reply-avatar">{reply.username[0]}</div>
                        <div>
                          <div className="reply-author">{reply.username}</div>
                          <div className="reply-time">{reply.createdAt}</div>
                        </div>
                      </div>
                      <div className="reply-content">{reply.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
