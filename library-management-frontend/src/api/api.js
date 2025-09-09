// import axios from 'axios';
// const API_URL = 'http://localhost:8080/api';
// export const loginUser = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
// export const getBooks = (token) => axios.get(`${API_URL}/books`, { headers: { Authorization: `Bearer ${token}` } });
// export const borrowBook = (id, token) => axios.put(`${API_URL}/books/borrow/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
// export const returnBook = (id, token) => axios.put(`${API_URL}/books/return/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
import axios from 'axios';

// Update this to your Render backend URL
const API_URL = 'https://library-management-books.onrender.com/api';

export const loginUser = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
export const registerUser = (name, email, password) => axios.post(`${API_URL}/auth/register`, { name, email, password });
export const getBooks = (token) => axios.get(`${API_URL}/books`, { headers: { Authorization: `Bearer ${token}` } });
export const borrowBook = (id, token) => axios.put(`${API_URL}/books/borrow/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const returnBook = (id, token) => axios.put(`${API_URL}/books/return/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const sendContactMessage = (data) => axios.post(`${API_URL}/contact`, data);