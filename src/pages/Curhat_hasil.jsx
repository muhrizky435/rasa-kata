import React from 'react';
import "../assets/styles/curhat_hasil.css";
import Sidebar from '../components/Sidebar';
import Group from '../assets/img/Group.png';


const forestImage = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=300&h=300";

function CurhatHasil() {
  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        {/* Header */}
        <header className="page-header">
          <h1 className="page-title">Mulai Curhat</h1>
        </header>

        {/* Content Area */}
        <div className="content-area results-area">
          {/* Emotion Result */}
          <div className="emotion-result">
            <p>
              Kami mendeteksi bahwa saat ini anda sedang merasakan
              <span className="emotion-highlight"> cemas</span>
            </p>
          </div>

          {/* Recommendation Intro */}
          <div className="recommendation-header">
            <p>Berikut rekomendasi video YouTube yang sesuai untuk membantumu!</p>
          </div>

          {/* Video Recommendations */}
          <div className="video-recommendations">
            {[1, 2, 3].map((_, index) => (
              <div className="video-card" key={index}>
                <div className="video-thumbnail">
                  <img src={forestImage} alt="Video thumbnail" />
                </div>
                <div className="video-title">
                  <a href="#">Judul Video Motivasi {index + 1}</a>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="input-container">
            <div className="input-wrapper">
              <div className="input-inner">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Tulis curhatanmu di sini..."
                />
                  <img src={Group} alt="icon Send" className="send-button" title="Kirim" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CurhatHasil;
