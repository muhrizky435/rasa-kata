import "../assets/styles/curhat_hasil.css";
import translateEmotionCode from "../utils/translateEmotionCode";
import getVideoTitle from "../utils/getVideoTitle";
import { useEffect, useState } from "react";
import { formatIndonesianDate } from "../utils/timeUtils";

function CurhatHasil({ emotionData }) {
  const [videoTitle, setVideoTitle] = useState([]);
  const [embeddedFrames, setEmbeddedFrames] = useState([]);

  useEffect(() => {
    const getVideoTitleFromData = async () => {
      const titles = [];
      const frames = [];

      for (let index = 0; index < emotionData.feedbackRecommendation.length; index++) {
        const data = await getVideoTitle(emotionData.feedbackRecommendation[index].youtube_link);
        titles.push(data.title);
        frames.push(data.html);
      }
      setVideoTitle(titles);
      setEmbeddedFrames(frames);
    };
    if (emotionData && emotionData.feedbackRecommendation.length > 0) {
      setVideoTitle([]);
      setEmbeddedFrames([]);
      getVideoTitleFromData();
    }
  }, [emotionData]);

  return (
    <>
    
      {/* Content Area */}
      <div className="content-area results-area">
        {/* Header */}
        {/* <div style={{marginBottom: '100px'}}>lorem ipsum</div> */}
        {/* Emotion Result */}
        { emotionData.history && (
          <div className="emotion-result">
          <p>
            Riwayat emosi {formatIndonesianDate(emotionData.createdAt)}
          </p>
        </div>
        )}
        
        <div className="emotion-result">
          <p>
            Kami mendeteksi bahwa saat ini anda sedang merasakan
            <span className="emotion-highlight">{` ${translateEmotionCode(emotionData.emotionCode)}`}</span>
          </p>
        </div>

        {/* Recommendation Intro */}
        <div className="recommendation-header">
          <p>Berikut rekomendasi video YouTube yang sesuai untuk membantumu!</p>
        </div>

        {/* Video Recommendations */}
        <div className="video-recommendations">
          {emotionData.feedbackRecommendation.map((recommendation, index) => (
            <div key={index} className="frame-container">
              {embeddedFrames[index] && (
                <div
                  className="embedded-frame"
                  dangerouslySetInnerHTML={{ __html: embeddedFrames[index] }}
                />
              )}
              <p className="video-title"><a href={recommendation.youtube_link} target="_blank" rel="noopener noreferrer">{videoTitle[index]}</a></p>
            </div>
          ))
          }
        </div>

      </div>
    </>
  );
}

export default CurhatHasil;
