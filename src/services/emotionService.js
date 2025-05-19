import axiosInstance from "../utils/axios";

// postService.js

// API base URL - replace with your actual API base URL
const axios = axiosInstance;

const emotionService = {
  predictEmotion: async (text) => {
    try {
      const response = await axios.post(`/predict`, { text: text });
      return response.data;
    } catch (error) {
      console.error("Error predicting emotion:", error);
      throw error;
    }
  },
};

export default emotionService;
