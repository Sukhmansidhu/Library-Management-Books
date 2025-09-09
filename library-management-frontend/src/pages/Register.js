import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { motion } from 'framer-motion';
import "../style/Register.css";
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member'); 
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(BookContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        role
      });

      const loginRes = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });

      setToken(loginRes.data.token);
      setUser({ username, role: loginRes.data.role });
      localStorage.setItem('token', loginRes.data.token);

      alert("Registration successful! You are now logged in.");
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="register-form-container"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <form onSubmit={handleSubmit} className="register-form-box">
        <h2 className="register-title">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="register-select"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="register-button">Register</button>
      </form>
    </motion.div>
  );
};

export default Register;