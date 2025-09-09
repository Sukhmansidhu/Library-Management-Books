// import { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { BookContext } from '../context/BookContext';
// import BookList from '../components/BookList';
// import SearchBar from '../components/SearchBar';
// import AddBook from '../components/AddBook';
// import "../style/Home.css";
// const Home = () => {
//   const { books, setBooks, token, loading: contextLoading, error: contextError, user } = useContext(BookContext);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loadingAction, setLoadingAction] = useState(false);
//   const [actionError, setActionError] = useState(null);

//   const [contactName, setContactName] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [contactMessage, setContactMessage] = useState('');
//   const [contactStatus, setContactStatus] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     setFilteredBooks(books);
//   }, [books]);

//   const handleBorrow = async (id) => {
//     setLoadingAction(true);
//     setActionError(null);
//     try {
//       await axios.put(`http://localhost:8080/api/books/borrow/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const res = await axios.get('http://localhost:8080/api/books', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBooks(res.data);
//     } catch (err) {
//       setActionError(err.response?.data?.message || 'Failed to borrow book');
//     } finally {
//       setLoadingAction(false);
//     }
//   };

//   const handleReturn = async (id) => {
//     setLoadingAction(true);
//     setActionError(null);
//     try {
//       await axios.put(`http://localhost:8080/api/books/return/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const res = await axios.get('http://localhost:8080/api/books', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBooks(res.data);
//     } catch (err) {
//       setActionError(err.response?.data?.message || 'Failed to return book');
//     } finally {
//       setLoadingAction(false);
//     }
//   };

//   const handleSearch = (searchTerm) => {
//     if (!searchTerm) {
//       setFilteredBooks(books);
//     } else {
//       const filtered = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBooks(filtered);
//     }
//   };

//   const handleContactSubmit = async (e) => {
//     e.preventDefault();
//     setContactStatus('Sending...');
//     try {
//       await axios.post('http://localhost:8080/api/contact', {
//         name: contactName,
//         email: contactEmail,
//         message: contactMessage
//       });
//       setContactStatus('Message sent successfully!');
//       setContactName('');
//       setContactEmail('');
//       setContactMessage('');
//     } catch (err) {
//       setContactStatus('Failed to send message.');
//     }
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   return (
//     <div className='home-page' id="top">
//       {!token ? (
//         <>
//           <motion.div
//             className="hero"
//             initial="hidden"
//             animate="visible"
//             variants={sectionVariants}
//           >
//             <div className="hero-content">
//               <h1 className="text-4xl font-bold mb-4">Welcome to the Library</h1>
//               <p className="text-lg mb-6">Manage your books efficiently and explore our collection.</p>
//             </div>
//           </motion.div>

//           <motion.div className="features py-20 bg-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
//             <h2 className="section-title">Features</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//               <div className="feature-card p-6 border rounded shadow">
//                 <h3 className="font-semibold text-xl mb-2">Borrow Books</h3>
//                 <p>Easily borrow books with a few clicks and track your borrowing history.</p>
//               </div>
//               <div className="feature-card p-6 border rounded shadow">
//                 <h3 className="font-semibold text-xl mb-2">Return Books</h3>
//                 <p>Return books on time and keep your account up-to-date.</p>
//               </div>
//               <div className="feature-card p-6 border rounded shadow">
//                 <h3 className="font-semibold text-xl mb-2">Admin Panel</h3>
//                 <p>Admins can manage books, add new ones, and monitor member activities.</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div className="about py-20 bg-gray-50 text-center" initial="hidden" animate="visible" variants={sectionVariants}>
//             <h2 className="section-title">About Us</h2>
//             <p className="max-w-3xl mx-auto text-lg">Our library system helps you manage books efficiently, whether you are a member or an admin. Explore books, borrow them, and return them seamlessly.</p>
//           </motion.div>

//           <motion.div className="testimonials py-20 bg-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
//             <h2 className="section-title">Testimonials</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//               <div className="testimonial-card p-6 border rounded shadow">
//                 <p className="mb-4">"This library system has transformed how I manage my reading list. Highly recommend!"</p>
//                 <h4 className="font-semibold">- Jane Doe</h4>
//               </div>
//               <div className="testimonial-card p-6 border rounded shadow">
//                 <p className="mb-4">"Easy to use and very efficient. The borrowing and returning features are seamless."</p>
//                 <h4 className="font-semibold">- John Smith</h4>
//               </div>
//               <div className="testimonial-card p-6 border rounded shadow">
//                 <p className="mb-4">"As an admin, I love the control and insight I get from the admin panel."</p>
//                 <h4 className="font-semibold">- Emily Johnson</h4>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div className="cta-banner py-20 bg-blue-600 text-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
//             <h2 className="section-title">Join Our Library Today!</h2>
//             <p className="max-w-3xl mx-auto mb-6 text-lg">Become a member and start exploring thousands of books at your fingertips.</p>
//             <button
//               className="btn-primary"
//               onClick={() => navigate('/register')}
//             >
//               Sign Up Now
//             </button>
//           </motion.div>

//           <motion.div className="contact py-20 bg-gray-50 text-center" initial="hidden" animate="visible" variants={sectionVariants}>
//             <h2 className="section-title">Contact Us</h2>
//             <form className="max-w-2xl mx-auto" onSubmit={handleContactSubmit}>
//               <input type="text" placeholder="Your Name" className="border p-2 w-full mb-4" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
//               <input type="email" placeholder="Your Email" className="border p-2 w-full mb-4" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
//               <textarea placeholder="Your Message" className="border p-2 w-full mb-4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required></textarea>
//               <button type="submit" className="btn-primary">Send Message</button>
//             </form>
//             {contactStatus && <p className="mt-4">{contactStatus}</p>}
//           </motion.div>
//           <footer className="footer">
//             <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
//             <div className="footer-links">
//               <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a> | 
//               <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('.about').scrollIntoView({ behavior: 'smooth' }); }}>About</a> | 
//               <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
//             </div>
//           </footer>
//         </>
//       ) : (
//         <>
//           <h1 className='library-books-title'>Library Books</h1>
//           <SearchBar onSearch={handleSearch} />
//           <AddBook />
//           {(contextLoading || loadingAction) && <p>Loading...</p>}
//           {contextError && <p style={{ color: 'red' }}>{contextError}</p>}
//           {actionError && <p style={{ color: 'red' }}>{actionError}</p>}
//           <BookList books={filteredBooks} onBorrow={handleBorrow} onReturn={handleReturn} user={user} />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import AddBook from '../components/AddBook';
import "../style/Home.css";

const Home = () => {
  const { books, setBooks, token, loading: contextLoading, error: contextError, user } = useContext(BookContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  const navigate = useNavigate();
  const API_URL = "https://library-management-books.onrender.com/api";

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleBorrow = async (id) => {
    setLoadingAction(true);
    setActionError(null);
    try {
      await axios.put(`${API_URL}/books/borrow/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to borrow book');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleReturn = async (id) => {
    setLoadingAction(true);
    setActionError(null);
    try {
      await axios.put(`${API_URL}/books/return/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to return book');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('Sending...');
    try {
      await axios.post(`${API_URL}/contact`, {
        name: contactName,
        email: contactEmail,
        message: contactMessage
      });
      setContactStatus('Message sent successfully!');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (err) {
      setContactStatus('Failed to send message.');
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className='home-page' id="top">
      {!token ? (
        <>
            <motion.div
            className="hero"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className="hero-content">
              <h1 className="text-4xl font-bold mb-4">Welcome to the Library</h1>
              <p className="text-lg mb-6">Manage your books efficiently and explore our collection.</p>
            </div>
          </motion.div>

          <motion.div className="features py-20 bg-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="section-title">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="feature-card p-6 border rounded shadow">
                <h3 className="font-semibold text-xl mb-2">Borrow Books</h3>
                <p>Easily borrow books with a few clicks and track your borrowing history.</p>
              </div>
              <div className="feature-card p-6 border rounded shadow">
                <h3 className="font-semibold text-xl mb-2">Return Books</h3>
                <p>Return books on time and keep your account up-to-date.</p>
              </div>
              <div className="feature-card p-6 border rounded shadow">
                <h3 className="font-semibold text-xl mb-2">Admin Panel</h3>
                <p>Admins can manage books, add new ones, and monitor member activities.</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="about py-20 bg-gray-50 text-center" initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="section-title">About Us</h2>
            <p className="max-w-3xl mx-auto text-lg">Our library system helps you manage books efficiently, whether you are a member or an admin. Explore books, borrow them, and return them seamlessly.</p>
          </motion.div>

          <motion.div className="testimonials py-20 bg-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="section-title">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="testimonial-card p-6 border rounded shadow">
                <p className="mb-4">"This library system has transformed how I manage my reading list. Highly recommend!"</p>
                <h4 className="font-semibold">- Jane Doe</h4>
              </div>
              <div className="testimonial-card p-6 border rounded shadow">
                <p className="mb-4">"Easy to use and very efficient. The borrowing and returning features are seamless."</p>
                <h4 className="font-semibold">- John Smith</h4>
              </div>
              <div className="testimonial-card p-6 border rounded shadow">
                <p className="mb-4">"As an admin, I love the control and insight I get from the admin panel."</p>
                <h4 className="font-semibold">- Emily Johnson</h4>
              </div>
            </div>
          </motion.div>

          <motion.div className="cta-banner py-20 bg-blue-600 text-white text-center" initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="section-title">Join Our Library Today!</h2>
            <p className="max-w-3xl mx-auto mb-6 text-lg">Become a member and start exploring thousands of books at your fingertips.</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </button>
          </motion.div>

          <motion.div className="contact py-20 bg-gray-50 text-center" initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="section-title">Contact Us</h2>
            <form className="max-w-2xl mx-auto" onSubmit={handleContactSubmit}>
              <input type="text" placeholder="Your Name" className="border p-2 w-full mb-4" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
              <input type="email" placeholder="Your Email" className="border p-2 w-full mb-4" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
              <textarea placeholder="Your Message" className="border p-2 w-full mb-4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
            {contactStatus && <p className="mt-4">{contactStatus}</p>}
          </motion.div>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
            <div className="footer-links">
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a> | 
              <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('.about').scrollIntoView({ behavior: 'smooth' }); }}>About</a> | 
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
            </div>
          </footer>
        </>
      ) : (
        <>
          <h1 className='library-books-title'>Library Books</h1>
          <SearchBar onSearch={handleSearch} />
          <AddBook />
          {(contextLoading || loadingAction) && <p>Loading...</p>}
          {contextError && <p style={{ color: 'red' }}>{contextError}</p>}
          {actionError && <p style={{ color: 'red' }}>{actionError}</p>}
          <BookList books={filteredBooks} onBorrow={handleBorrow} onReturn={handleReturn} user={user} />
        </>
      )}
    </div>
  );
};

export default Home;