// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const BookContext = createContext();

// export const BookProvider = ({ children }) => {
//   const [books, setBooks] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [userLoading, setUserLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (!token) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get('http://localhost:8080/api/books', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setBooks(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch books');
//         if (err.response?.status === 401) {
//           setToken('');
//           localStorage.removeItem('token');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, [token]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setUserLoading(true);
//       if (!token) {
//         setUser(null);
//         setUserLoading(false);
//         return;
//       }
//       try {
//         const res = await axios.get('http://localhost:8080/api/auth/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//         setToken('');
//         localStorage.removeItem('token');
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     fetchUser();
//   }, [token]);

//   return (
//     <BookContext.Provider value={{ books, setBooks, token, setToken, user, setUser, loading, error, userLoading }}>
//       {children}
//     </BookContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://library-management-books.onrender.com/api";

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/books`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch books');
        if (err.response?.status === 401) {
          setToken('');
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [token]);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <BookContext.Provider value={{ books, setBooks, token, setToken, user, setUser, loading, error, userLoading }}>
      {children}
    </BookContext.Provider>
  );
};