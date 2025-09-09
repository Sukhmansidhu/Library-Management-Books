
// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { BookContext } from '../context/BookContext';
// import "../style/Navbar.css";
// const Navbar = () => {
//   const { token, setToken, setUser } = useContext(BookContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setUser(null);
//     navigate('/'); 
//   };

//   const scrollToSection = (selector) => {
//     const section = document.querySelector(selector);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo" >
//        <img src="/assets/Library.png" alt="Library Logo" className="navbar-logo" />
//       </Link>
//       <div className="nav-links">
//         {!token && (
//           <>
//             <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('#top')}>Home</span>
//             <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('.about')}>About</span>
//             <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('.contact')}>Contact</span>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//         {token && <button onClick={handleLogout}>Logout</button>}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import "../style/Navbar.css";
import LibraryLogo from '../assets/Library.png'; // Import image directly

const Navbar = () => {
  const { token, setToken, setUser } = useContext(BookContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/'); 
  };

  const scrollToSection = (selector) => {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" >
       <img src={LibraryLogo} alt="Library Logo" className="navbar-logo" />
      </Link>
      <div className="nav-links">
        {!token && (
          <>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('#top')}>Home</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('.about')}>About</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('.contact')}>Contact</span>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;