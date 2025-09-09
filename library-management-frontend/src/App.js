import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';   // ✅ add this
import NotFound from './pages/NotFound';

function App() {
  return (
    <BookProvider>
      <Router>
        <Navbar />   {/* ✅ shows at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;