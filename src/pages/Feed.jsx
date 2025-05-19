import { useState, useEffect } from "react";
import "../assets/styles/feed.css";
import Sidebar from "../components/Sidebar";
import postService from "../services/postService";
import { formatRelativeTime } from "../utils/timeUtils";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Logo } from "../components/Logo";

const Feed = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data.data);
        const postsToBeSorted = [...data.data];
        console.log(await postService.getAllPosts());

        const sortedPosts = postsToBeSorted.sort((a, b) => b.commentsCount - a.commentsCount);
        setBestPosts([sortedPosts[0], sortedPosts[1], sortedPosts[2]]);

        
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (postContent.trim() === "") return;

    try {
      setIsLoading(true);
      const storyData = {
        content: postContent,
      };

      // Submit the new post through the API
      const newPost = await postService.postStory(storyData);

      // Update the UI with the new post
      setPosts([newPost, ...posts]);
      setPostContent("");
      setIsLoading(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setIsLoading(false);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container feed-page">
      <Sidebar />
      <main className="main-content">
        <Logo />
        <h2 className="page-title">Curhat Anonim</h2>
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
        {error && <p className="error-message">{error}</p>}

        {/* Posts */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">No posts yet. Be the first to share!</div>
        ) : (
          <div className="posts-container">
            <div className="main-posts">
              <h3>All posts</h3>
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-avatar">
                      {post.username ? post.username[0] : "?"}
                    </div>
                    <div>
                      <div className="post-author">Anonymous</div>
                      <div className="post-time">
                        {formatRelativeTime(post.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="post-content">{post.content}</div>
                  <div className="post-footer">
                    <Link to={`/feed/${post.id}`}>
                      <button className="post-reply-button">
                        {post.commentsCount} balasan
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="side-posts">
              <div className="best-posts">
                <h3>Most hot posts</h3>
                {bestPosts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-avatar">
                        {post.username ? post.username[0] : "?"}
                      </div>
                      <div>
                        <div className="post-author">Anonymous</div>
                        <div className="post-time">
                          {formatRelativeTime(post.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-footer">
                      <Link to={`/feed/${post.id}`}>
                        <button className="post-reply-button">
                          {post.commentsCount} balasan
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-posts" style={{ paddingBottom: "80px"}}>
                <h3>My posts</h3>
                <div className="post-card">
                  <div className="post-header">
                    <div className="post-avatar">
                      ?
                    </div>
                    <div>
                      <div className="post-author">Anonymous</div>
                      <div className="post-time">
                        4 jam yang lalu
                      </div>
                    </div>
                  </div>
                  <div className="post-content">sakdfjask;fjkasdjfkasdjf kasjfksajfkl;jas kfjskdfjsdklfjasdkfjklsd jfksjfjifowjeifojweifjw eifhjjkvnksnfkewj</div>
                  <div className="post-footer">
                    <Link to={`/feed/1`}>
                      <button className="post-reply-button">
                        34 balasan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;
