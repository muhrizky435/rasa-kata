import axiosInstance from "../utils/axios";

// postService.js

// API base URL - replace with your actual API base URL
const axios = axiosInstance;

/**
 * Service for handling posts, stories, and comments
 */
const postService = {
    /**
     * Get all posts
     * @returns {Promise} Promise resolving to the posts data
     */
    getAllPosts: async () => {
        try {
            const response = await axios.get(`/story`);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    /**
     * Get a single post by ID
     * @param {string} id - The post ID
     * @returns {Promise} Promise resolving to the post data
     */
    getPostById: async (id) => {
        try {
            const response = await axios.get(`/story/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            throw error;
        }
    },

    /**
     * Create a new story post
     * @param {Object} storyData - The story data to post
     * @returns {Promise} Promise resolving to the created story data
     */
    postStory: async (storyData) => {
        try {
            const response = await axios.post(`/story`, storyData);
            return response.data;
        } catch (error) {
            console.error('Error posting story:', error);
            throw error;
        }
    },

    /**
     * Add a comment to a post
     * @param {string} postId - The ID of the post to comment on
     * @param {Object} commentData - The comment data
     * @returns {Promise} Promise resolving to the created comment data
     */
    postComment: async (postId, commentData) => {
        try {
            const response = await axios.post(`/story/${postId}/comments`, commentData);
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }
};

export default postService;