import React from 'react';
import BookCard from './BookCard';
import "../style/BookList.css";

const BookList = ({ books, onBorrow, onReturn, user }) => {
  if (!user) {
    return (
      <p className="book-list-message">
        Please log in to view the book collection.
      </p>
    );
  }

  if (!books.length) {
    return (
      <p className="book-list-message">
        No books available at the moment.
      </p>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onBorrow={onBorrow}
          onReturn={onReturn}
          user={user}
        />
      ))}
    </div>
  );
};

export default BookList;
