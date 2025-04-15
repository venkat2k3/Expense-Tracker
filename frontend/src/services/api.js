import axios from 'axios';

const API_URL = 'http://localhost:8099/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication services
export const registerUser = (userData) => {
  return api.post('/register', userData);
};

export const loginUser = (credentials) => {
  return api.post('/login', credentials);
};

// Transaction services
export const getTransactions = () => {
  return api.get('/transactions');
};

export const addTransaction = (transaction) => {
  return api.post('/transactions', transaction);
};

export default api;
