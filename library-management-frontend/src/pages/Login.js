// import { useState, useContext } from 'react';
// import axios from 'axios';
// import { BookContext } from '../context/BookContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import "../style/Login.css";
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { setToken, setUser } = useContext(BookContext);
//   const navigate = useNavigate();

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
     
//   //     const res = await axios.post("http://localhost:8080/api/auth/login", {
//   //       username,
//   //       password
//   //     });

     
//   //     localStorage.setItem('token', res.data.token);
//   //     setToken(res.data.token);

     
//   //     setUser(res.data.user);

//   //     navigate('/');
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Login failed");
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const API_URL = "https://library-management-books.onrender.com/api";

//     const res = await axios.post(`${API_URL}/auth/login`, {
//       email: username,  
//       password
//     });

//     localStorage.setItem('token', res.data.token);
//     setToken(res.data.token);
//     setUser(res.data.user);

//     navigate('/');
//   } catch (err) {
//     alert(err.response?.data?.msg || "Login failed");
//   }
// };
//   const formVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   return (
    
//     <motion.div 
//       className='login-form-container'
//       initial="hidden"
//       animate="visible"
//       variants={formVariants}
//     >
//       <form onSubmit={handleSubmit} className='login-form-box'>
//         <h2 className="login-title">Login</h2>
//         <input 
//           type='text' 
//           placeholder='Username' 
//           value={username} 
//           onChange={e => setUsername(e.target.value)} 
//           required 
//           className='login-input'
//         />
//         <input 
//           type='password' 
//           placeholder='Password' 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           required 
//           className='login-input'
//         />
//         <button type='submit' className='login-button'>Login</button>
//       </form>
//     </motion.div>
//   );
// };

// export default Login;
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { motion } from 'framer-motion';
import "../style/Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useContext(BookContext);
  const navigate = useNavigate();

  const API_URL = "https://library-management-books.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser({ username: res.data.user.username, role: res.data.user.role });

      alert("Login successful!");
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className='login-form-container'
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <form onSubmit={handleSubmit} className='login-form-box'>
        <h2 className="login-title">Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className='login-input'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className='login-input'
        />
        <button type='submit' className='login-button'>Login</button>
      </form>
    </motion.div>
  );
};

export default Login;