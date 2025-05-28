import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../assets/styles/curhat.css";
import ConcentricCircles from '../components/Circles';
import Group from '../assets/img/Group.png';
import CurhatHasil from './Curhat_hasil';
import emotionService from '../services/emotionService';
import { Loading } from '../components/Loading';
import authService from '../services/authService';

function CurhatPage() {

  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [emotionData, setEmotionData] = useState(null);
  const user = authService.getCurrentUser();
  const { id } = useParams();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (story.trim() === "") return;
    try {
      setIsLoading(true);
      const response = await emotionService.predictEmotion(story);
      setEmotionData(response.data);

      await emotionService.saveEmotion({
        user_id: user.id,
        emotion_code: response.data.emotionCode,
        prompt: story
      });

      setIsResult(true);
      setIsLoading(false);
      setStory("");
    } catch (error) {
      console.log("Error predicting emotion:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchEmotionData = async () => {
      try {
        setIsLoading(true);
        const response = await emotionService.getEmotionById(id);

        const recommendationResponse = await emotionService.getRecommendation(response.data.emotion_code);

        const data = {
          history: true,
          feedbackRecommendation: recommendationResponse.data,
          emotionCode: response.data.emotion_code,
          createdAt: response.data.created_at,
          prompt: response.data.prompt,
        };
        setEmotionData(data);
        setIsResult(true);
        console.log("Fetched Emotion Data:", response.data);
      } catch (error) {
        console.error("Error fetching emotion data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmotionData();
  }, [id])

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Mulai Curhat</h1>
        </header>
        {isResult ? (isLoading ? <Loading /> : <CurhatHasil emotionData={emotionData} />) :
          (isLoading ? <Loading /> :
            <div className="content-area">
              <div>
                <ConcentricCircles />
              </div>

              {/* Text Prompt */}
              <h2 className="prompt-text">
                Ceritakan Masalahmu
              </h2>
            </div>)}

        {/* Chat Input Box */}
        {!id && (<form className="input-container" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <div className="input-inner">
              <input
                type="text"
                className="chat-input"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Tulis curhatanmu di sini..."
              />
              <button type="submit" className='submit-button' >
                <img src={Group} alt="icon Send" className="send-button" title="Kirim" />
              </button>
            </div>
          </div>
        </form>)}

      </main>
    </div>
  );
}

export default CurhatPage;