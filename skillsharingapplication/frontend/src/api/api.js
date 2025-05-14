import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // Adjust if backend is hosted elsewhere
});

export default api;