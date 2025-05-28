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

  saveEmotion: async (emotionData) => {
    try {
      const response = await axios.post(`/emotion`, emotionData);
      return response.data;
    } catch (error) {
      console.error("Error saving emotion:", error);
      throw error;
    }
  },

  getEmotionData: async (userId) => {
    try {
      const response = await axios.get(`/emotion/${userId}/user`);
      return response.data;
    } catch (error) {
      console.error("Error fetching emotion data:", error);
      throw error;
    }
  },

  getEmotionById: async (emotionId) => {
    try {
      const response = await axios.get(`/emotion/${emotionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching emotion by ID:", error);
      throw error;
    }
  },

  getRecommendation: async (emotionCode) => {
    try {
      const response = await axios.get(`/feedback/${emotionCode}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      throw error;
    }
  }
};

export default emotionService;
