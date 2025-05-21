import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Icon from "../assets/img/Group 22.png";
import "../assets/styles/dashboard.css";

const Dashboard = () => {
  // Sample recent emotion log data
  const [recentEmotions] = useState([
    {
      id: 1,
      emotion: "Lorem",
      color: "#7B68EE",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      emotion: "Lorem",
      color: "#7B68EE",
      timestamp: "2 days ago",
    },
    {
      id: 3,
      emotion: "Lorem",
      color: "#7B68EE",
      timestamp: "2 days ago",
    },
  ]);

  // Sample emotion chart data
  const emotionStats = [
    { name: "Senang", value: 31, color: "#9DB2F9" },
    { name: "Sedih", value: 12, color: "#F8B4B2" },
    { name: "Cinta", value: 17, color: "#FF9694" },
    { name: "Marah", value: 19, color: "#FCAE56" },
    { name: "Tenang", value: 52, color: "#57E194" },
    { name: "Takut", value: 21, color: "#B2B2B2" },
  ];
  const totalSum = emotionStats.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="welcome-layout">
          {/* Welcome Text Section */}
          <div className="welcome-section">
            <h2 className="welcome-heading">
              Selamat datang, <span className="highlight-name">Hanifan!</span>
            </h2>
            <p className="welcome-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad.
            </p>
            <div className="welcome-buttons">
              <button className="btn primary-btn">Curhat</button>
              <button className="btn secondary-btn">Bagikan Ceritamu</button>
            </div>
          </div>

          <div className="vertical-divider"></div>
          {/* Mood Section */}
          <div className="mood-section">
            <div className="mood-illustration">
              <img src={Icon} alt="Mood illustration" />
            </div>
            <h3 className="mood-heading">Bagaimana perasaanmu?</h3>
            <p className="mood-paragraph">
              Jejak perasaanmu terakhir kali itu sedih, bagaimana dengan hari
              ini?
            </p>
            <button className="btn mood-btn">Lihat Perkembangan emosimu</button>
          </div>
        </div>

        <div className="divider"></div>
        <div className="metrics-title">
          <h2>Metrik</h2>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card pink">
            <div className="stat-header">
              <h3 className="stat-label">Jumlah Curhat sesi</h3>
            </div>
            <div className="stat-content">
              <span className="stat-checkmark">✓</span>
              <h3 className="stat-value">12</h3>
            </div>
          </div>

          <div className="stat-card blue">
            <div className="stat-header">
              <h3 className="stat-label">Jumlah Cerita</h3>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">12</h3>
              <span className="stat-unit">cerita</span>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-header">
              <h3 className="stat-label">Rekor Pengguna</h3>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">12</h3>
              <span className="stat-unit">Hari</span>
            </div>
          </div>
        </div>

        {/* Emotion chart and logs */}
        <div className="dashboard-sections">
          {/* Emotion Pie Chart */}
          <div className="emotion-pie-container">
            <div className="emotion-pie-chart">
              <svg viewBox="0 0 400 400" className="pie-chart">
                <circle cx="200" cy="200" r="160" fill="#f0f0f0" />

                {/* We'll render segments programmatically */}
                {emotionStats.map((emotion, index) => {
                  // Calculate the percentage and angles for SVG arc
                  // const percentage = (emotion.value / totalSum) * 100;
                  const startAngle =
                    index === 0
                      ? 0
                      : emotionStats
                          .slice(0, index)
                          .reduce(
                            (sum, item) => sum + (item.value / totalSum) * 360,
                            0
                          );
                  const endAngle =
                    startAngle + (emotion.value / totalSum) * 360;

                  // Convert angles to radians for SVG path
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  // Calculate SVG path
                  const x1 = 200 + 160 * Math.cos(startRad);
                  const y1 = 200 + 160 * Math.sin(startRad);
                  const x2 = 200 + 160 * Math.cos(endRad);
                  const y2 = 200 + 160 * Math.sin(endRad);

                  // Determine if the arc should be drawn the long way around
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                  // Create the SVG path
                  const path = `M 200 200 L ${x1} ${y1} A 160 160 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                  return (
                    <path key={emotion.name} d={path} fill={emotion.color} />
                  );
                })}
              </svg>
            </div>

            <div className="emotion-labels">
              {emotionStats.map((emotion) => (
                <div key={emotion.name} className="emotion-label-item">
                  <div
                    className="emotion-color-dot"
                    style={{ backgroundColor: emotion.color }}
                  ></div>
                  <span className="emotion-name">{emotion.name}</span>
                  <span className="emotion-value">{emotion.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Recent Emotion Logs */}
          <div className="emotion-logs-container">
            <h3 className="logs-title">Lihat Jejak Emosimu</h3>
            <div className="emotion-logs">
              {recentEmotions.map((emotion) => (
                <div key={emotion.id} className="emotion-log-item">
                  <div
                    className="emotion-log-dot"
                    style={{ backgroundColor: emotion.color }}
                  ></div>
                  <span className="emotion-log-name">{emotion.emotion}</span>
                  <span className="emotion-log-time">{emotion.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
