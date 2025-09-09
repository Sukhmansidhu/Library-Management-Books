
import { motion } from 'framer-motion';
import "../style/BookCard.css";
const BookCard = ({ book, onBorrow, onReturn, user }) => {
  if (!user) return null; 

const isBorrowedByUser =
  book?.borrowedBy &&
  (
    book.borrowedBy._id?.toString?.() === user._id?.toString() ||
    book.borrowedBy === user._id ||
    book.borrowedBy.email === user.email ||
    book.borrowedBy.username === user.username
  );

  const handleBorrowClick = () => {
    console.log("Borrowing book ID:", book._id);
    onBorrow(book._id);
  };

  const handleReturnClick = () => {
    console.log("Returning book ID:", book._id);
    onReturn(book._id);
  };

  return (
    <motion.div
      className="book-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fef3c7'
      }}
    >
      {book.image ? (
        <img
          src={`http://localhost:8080/uploads/${book.image}`}
          alt={book.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px'
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: '#ddd',
            borderRadius: '10px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            color: '#555'
          }}
        >
          No Image Available
        </div>
      )}

      <h3 style={{ marginBottom: '5px', fontSize: '1.2rem', fontWeight: 'bold' }}>{book.title}</h3>
      <p style={{ marginBottom: '5px' }}>
        <strong>Author:</strong> {book.author}
      </p>
      <p style={{ marginBottom: '5px' }}>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p style={{ marginBottom: '10px' }}>
        <strong>Status:</strong> {book.available ? 'Available' : 'Borrowed'}
      </p>

      {!book.available && book.borrowedBy && (
        <p style={{ marginBottom: '10px' }}>
          <strong>Borrowed by:</strong> {book.borrowedBy.username}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {book.available && (
          <button
            onClick={handleBorrowClick}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Borrow
          </button>
        )}

        {!book.available && isBorrowedByUser && (
          <button
            onClick={handleReturnClick}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#147a58ff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Return
          </button>
        )}

        {!book.available && !isBorrowedByUser && (
          <button
            disabled
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#9ca3af',
              color: '#fff',
              border: 'none',
              cursor: 'not-allowed'
            }}
          >
            Not Available
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
