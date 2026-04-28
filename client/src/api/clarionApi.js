import axios from 'axios';

const api = axios.create({
  baseURL: 'https://clarion-backend-yags.onrender.com/api',
  timeout: 60000,
});

export const analyzeNews = (topic) => api.post('/analyze', { topic });
export const getTrending = () => api.get('/trending');