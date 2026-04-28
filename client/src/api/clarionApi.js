import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 60000,
});

export const analyzeNews = (topic) => api.post('/analyze', { topic });
export const getTrending = () => api.get('/trending');
