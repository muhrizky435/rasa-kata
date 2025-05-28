import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/img/Group 22.png";
import "../assets/styles/dashboard.css";
import authService from "../services/authService";
import emotionService from "../services/emotionService";
import { formatRelativeTime } from "../utils/timeUtils";
import postService from "../services/postService";
import getStreakDay from "../utils/getStreakDay";
import { Loading } from "../components/Loading";

const Dashboard = () => {
  const [storiesData, setStoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emotionStats, setEmotionStats] = useState([
    { name: "Sedih", code: 0, value: 0, color: "#F8B4B2" },
    { name: "Senang", code: 1, value: 0, color: "#9DB2F9" },
    { name: "Cinta", code: 2, value: 2, color: "#FF9694" },
    { name: "Marah", code: 3, value: 0, color: "#FCAE56" },
    { name: "Takut", code: 4, value: 0, color: "#B2B2B2" },
    { name: "Terkejut", code: 5, value: 0, color: "#57E194" },
  ]);

  const [emotionData, setEmotionData] = useState([]);
  const user = authService.getCurrentUser();
  const totalSum = emotionStats.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const fetchResponseData = async () => {
      try {
        setIsLoading(true);
        const response = await postService.getStoryByUsername(user.anonymous_username);
        setStoriesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResponseData();
  }, [user.anonymous_username])


  useEffect(() => {
    const fetchResponseData = async () => {
      try {
        setIsLoading(true);
        const response = await emotionService.getEmotionData(user.id);
        console.log("Response Data:", response.data);
        const newEmotionStats = emotionStats.map((emotion) => {
          const match = response.data.find(item => item.emotion_code === emotion.code);

          if (match) {
            const emotionCount = response.data.filter(item => item.emotion_code === emotion.code).length;
            return { ...emotion, value: emotionCount };
          }

          return emotion;
        })

        setEmotionStats(newEmotionStats);

        setEmotionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const emotionTranslator = (emotionCode) => {
    switch (emotionCode) {
      case 0:
        return { emotion: "Sedih", color: "#F8B4B2" };
      case 1:
        return { emotion: "Senang", color: "#9DB2F9" };
      case 2:
        return { emotion: "Cinta", color: "#FF9694" };
      case 3:
        return { emotion: "Marah", color: "#FCAE56" };
      case 4:
        return { emotion: "Takut", color: "#B2B2B2" };
      case 5:
        return { emotion: "Terkejut", color: "#57E194" };
      default:
        return "Unknown";
    }
  }

  return (

    <main className="main-content dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="welcome-layout">
        {/* Welcome Text Section */}
        <div className="welcome-section">
          <h2 className="welcome-heading">
            Selamat datang, <span className="highlight-name">{user.name}!</span>
          </h2>
          <p className="welcome-paragraph">
            Perasaan seseorang adalah sebuah hal yang seharusnya tidak dipendam sendirian. Jika terasa berat untuk bercerita kepada orang lain, kamu bisa bercerita kepada kami. Kami siap mendengarkanmu.
          </p>
          <div className="welcome-buttons">
            <Link to="/curhat"><button className="btn primary-btn">Curhat</button></Link>
            <Link to="/feed"><button className="btn secondary-btn">Bagikan Ceritamu</button></Link>
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
          <a href="#metrik">
            <button className="btn mood-btn">Lihat Perkembangan emosimu</button>
          </a>
        </div>
      </div>

      <div className="divider"></div>
      <div className="metrics-title">
        <h2>Metrik</h2>
      </div>
      {isLoading ? (<Loading />) : (
        <>
          <div className="stats-grid" id="metrik">
            <div className="stat-card pink">
              <div className="stat-header">
                <h3 className="stat-label">Jumlah Curhat sesi</h3>
              </div>
              <div className="stat-content">
                <span className="stat-checkmark">✓</span>
                <h3 className="stat-value">{emotionData.length}</h3>
              </div>
            </div>

            <div className="stat-card blue">
              <div className="stat-header">
                <h3 className="stat-label">Jumlah Cerita</h3>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{storiesData.length}</h3>
                <span className="stat-unit">cerita</span>
              </div>
            </div>

            <div className="stat-card green">
              <div className="stat-header">
                <h3 className="stat-label">Rekor Pengguna</h3>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{getStreakDay(emotionData)}</h3>
                <span className="stat-unit">Hari</span>
              </div>
            </div>
          </div>
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
                {emotionData.map((emotion) => {
                  const translatedEmotion = emotionTranslator(emotion.emotion_code);
                  return (
                    <div key={emotion.id} className="emotion-log-item">
                      <div
                        className="emotion-log-dot"
                        style={{ backgroundColor: translatedEmotion.color }}
                      ></div>
                      <Link to={`/curhat/${emotion.id}`}><span className="emotion-log-name">{translatedEmotion.emotion}</span></Link>
                      <span className="emotion-log-time">{formatRelativeTime(emotion.created_at)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
