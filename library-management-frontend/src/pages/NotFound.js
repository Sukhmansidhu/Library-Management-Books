import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "../style/NotFound.css";
const NotFound = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      className="not-found-page"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">The page you are looking for does not exist.</p>
      <Link to="/" className="not-found-link">Go back to Home</Link>
    </motion.div>
  );
};

export default NotFound;