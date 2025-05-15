import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import "../assets/styles/feed.css";
import Sidebar from "../components/Sidebar";
import AuthContext from "../contexts/AuthContext";
import postService from "../services/postService";
import { formatRelativeTime } from "../utils/timeUtils";
import { Loading } from "../components/Loading";

const FeedDetail = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  // Fetch all posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await postService.getPostById(id);
        setPost(data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") return;
    setIsLoading(true);
    try {
      const commentData = {
        content: comment,
      };

      // Submit the new post through the API
      const newPost = await postService.postComment(id, commentData);

      // Update the UI with the new post
      setPost(newPost);
      setComment("");
      setIsLoading(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-container feed-page">
      <Sidebar />
      <main className="main-content">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="post-detail-container">
            <div className="post-card">
              <div className="post-header">
                <div className="post-avatar">?</div>
                <div>
                  <div className="post-author">Anonymous</div>
                  <div className="post-time">{formatRelativeTime(post.created_at)}</div>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
            </div>
            <div className="comments-container">
              {post.comments.length === 0 ? (
                <div className="no-comments-message">Belum ada balasan, jadilah orang pertama yang dapat mendengarkan cerita orang ini.</div>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="post-card">
                    <div className="post-header">
                      <div className="post-avatar">?</div>
                      <div>
                        <div className="post-author">Anonymous</div>
                        <div className="post-time">{formatRelativeTime(comment.created_at)}</div>
                      </div>
                    </div>
                    <div className="post-content">{comment.content}</div>
                  </div>
                ))
              )}
            </div>
            <div
              className="create-post-container"
              style={{ marginTop: "20px" }}
            >
              {/* <div className="create-post-header">Buat Balasan</div> */}
              <form onSubmit={handleCommentSubmit} className="create-post-form">
                <input
                  type="text"
                  className="create-post-input"
                  placeholder="Tulis balasan..."
                  value={comment}
                  onChange={(e) => {setComment(e.target.value); console.log(comment)}}
                />
                <button type="submit" className="create-post-button">
                  Unggah
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedDetail;
