import React from 'react';
import Sidebar from '../components/Sidebar';
import "../assets/styles/curhat.css";
import ConcentricCircles from '../components/Circles';
import Group from '../assets/img/Group.png';

function CurhatPage() {
  const handleSendMessage = (message) => {
    console.log("Sending message:", message);
    // LOGIKA KIRIM PESAN
  };

  return (
    <div className="app-container curhat-page">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Mulai Curhat</h1>
        </header>
        <div className="content-area">
          <div>
            <ConcentricCircles />
          </div>

          {/* Text Prompt */}
          <h2 className="prompt-text">
            Ceritakan Masalahmu
          </h2>

          {/* Chat Input Box */}
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

export default CurhatPage;