import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../assets/styles/landing_page.css"; // Sesuaikan path dan nama file CSS
import logoImg from "../../assets/img/logo-rasa-kata.png";
import featureDiagram from "../../assets/img/img_group_8.svg";
import journalIcon from "../../assets/img/img_group_36x40.png";
import aiIcon from "../../assets/img/img_group.png";
import deteksiIcon from "../../assets/img/img_group_14.png";
import trackingGraph from "../../assets/img/img_vector.svg";
import arrowWhite from "../../assets/img/img_vector_white_a700.svg";

// SAMPLE DATA
const LandingPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "HanifAnonim",
      time: "2 jam lalu",
      content:
        "Why are the poorest states in America nearly all Republican? Why are the richest states nearly all Democrat?",
      replies: 10,
      showReplies: false,
      replyContent:
        "Aren't the poorest republican states highest on the welfare list? They detest the people who are keeping their lights on.",
    },
  ]);
  const [newPostText, setNewPostText] = useState("");

  const toggleReplies = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, showReplies: !post.showReplies } : post
      )
    );
  };

  const handlePostSubmit = () => {
    if (newPostText.trim() === "") return;

    const newPost = {
      id: Date.now(),
      author: "AnonymousUser",
      time: "Baru saja",
      content: newPostText,
      replies: 0,
      showReplies: false,
      replyContent: "",
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewPostText("");
  };

  return (
    <div className="container">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header>
        <div className="content-wrapper">
          <div className="logo">
            <img src={logoImg} alt="Rasa Kata Logo" />
          </div>
          <nav>
            <div className="nav-links">
              <a href="#home" aria-label="Go to Home">
                Home
              </a>
              <a href="#about" aria-label="Go to About">
                About
              </a>
              <a href="#features" aria-label="Go to Features">
                Feature
              </a>
            </div>
            <div className="auth-buttons">
              <Link to="/">
                <button className="btn btn-primary" aria-label="Login">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline" aria-label="Sign Up">
                  Sign Up
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" id="main-content">
        <div className="content-wrapper">
          <div className="emotion-circle">
            <div className="feature-diagram-container">
              <img
                src={featureDiagram}
                alt="Feature Diagram"
                className="feature-diagram"
              />
              <div className="feature-tag tag-detection">Deteksi Emosi</div>
              <div className="feature-tag tag-visualization">
                Visualisasi Emosi
              </div>
              <div className="feature-tag tag-tracking">Lacak Emosi Harian</div>
              <div className="feature-tag tag-feedback">Feedback Video</div>
              <div className="feature-tag tag-posting">Posting Anonim</div>
            </div>
          </div>
          <h1 className="hero-title">
            Kenali & Kelola Emosimu dengan Lebih Baik dengan{" "}
            <span>AI Rasa Kata</span>
          </h1>
        </div>
      </section>

      <section className="features" id="features">
        <div className="content-wrapper">
          <img src={deteksiIcon} alt="Icon deteksi" />
          <h2 className="feature-title">Deteksi Emosi Otomatis</h2>
          <p className="feature-description">
            Rasakan kelegaan dengan sistem kami yang menganalisis isi jurnal
            atau percakapanmu secara real-time, dan mendeteksi emosi yang sedang
            kamu alami. Tanpa perlu repot menandai sendiri — biarkan AI kami
            membantumu memahami dirimu.
          </p>
          <div className="feature-cards">
            <div className="feature-card feature-card-left">
              <img
                src={journalIcon}
                alt="Journal Icon"
                className="feature-card-icon"
              />
              <h3 className="feature-card-title">
                Tulis Jurnalmu dengan Bebas
              </h3>
              <p className="feature-card-description">
                Ungkapkan perasaanmu, ceritakan hari-harimu, atau curahkan isi
                pikiranmu—tanpa sensor, tanpa takut dihakimi.
              </p>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card feature-card-right">
              <img src={aiIcon} alt="AI Icon" className="feature-card-icon" />
              <h3 className="feature-card-title">
                Biarkan AI Mendeteksi Emosimu
              </h3>
              <p className="feature-card-description">
                Dalam hitungan detik, sistem kami akan membaca dan memahami
                tulisanmu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="emotion-tracking">
        <div className="content-wrapper card">
          <img
            src={trackingGraph}
            alt="Emotion Tracking Graph"
            className="tracking-graph"
          />
          <div className="tracking-content">
            <h2 className="tracking-title">Pantau Perkembangan Emosimu</h2>
          </div>
        </div>
      </section>

      <section className="anonymous-forum">
        <div className="content-wrapper">
          <h2 className="forum-title">Halaman Anonim untuk Berbagi Cerita</h2>
          <p className="forum-description">
            Ingin mencurahkan isi hati tanpa takut dihakimi? Bagikan ceritamu
            secara anonim dan temukan kekuatan dari kisah orang lain. Scroll dan
            temukan bahwa kamu tidak sendirian — semua orang sedang berjuang
            dengan caranya masing-masing.
          </p>

          <div className="forum-container">
            <div className="post-input">
              <input
                type="text"
                placeholder="Apa ceritamu hari ini?"
                aria-label="Enter your story"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePostSubmit();
                }}
              />
              <button onClick={handlePostSubmit} aria-label="Upload post">
                Unggah
              </button>
            </div>

            <div className="forum-posts">
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="post">
                    <div className="post-header">
                      <div className="post-author">{post.author}</div>
                      <div className="post-time">{post.time}</div>
                    </div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-actions">
                      {post.replies > 0 && (
                        <div
                          className="post-reply-count"
                          aria-expanded={post.showReplies}
                          tabIndex={0}
                          onClick={() => toggleReplies(post.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              toggleReplies(post.id);
                            }
                          }}
                        >
                          {post.replies} Balasan
                        </div>
                      )}
                    </div>
                  </div>
                  {post.showReplies && post.replyContent && (
                    <div className="reply">
                      <div className="reply-line"></div>
                      <div className="reply-content">{post.replyContent}</div>
                    </div>
                  )}
                  <div className="post-divider"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="content-wrapper">
          <div className="cta-logo">
            <img src={logoImg} alt="Rasa Kata Logo" />
          </div>
          <h2 className="cta-title">Mulai Perjalanan Emosionalmu Hari Ini</h2>
          <p className="cta-description">
            Jangan biarkan stres mendominasi hidupmu. Tulis, berbagi, dan
            temukan dukungan secara personal maupun komunitas.
          </p>
          <button className="cta-button" aria-label="Start now">
            <span className="cta-button-text">Mulai Sekarang</span>
            <img src={arrowWhite} alt="Arrow" />
          </button>
        </div>
      </section>

      <footer>
        <div className="content-wrapper">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logoImg} alt="Rasa Kata Logo" />
            </div>
            <div className="footer-links">
              <div className="footer-link">@2025</div>
              <div className="footer-link">CC25-CF208</div>
              <div className="footer-link">
                Coding Camp Powered by DBS Foundation
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
