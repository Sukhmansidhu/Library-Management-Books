import { useState, useContext } from 'react';
import axios from 'axios';
import { BookContext } from '../context/BookContext';
import "../style/AddBook.css";
const AddBook = () => {
  const { token, user, userLoading, setBooks } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/books",
        formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
      );

      
      const booksRes = await axios.get("http://localhost:8080/api/books", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(booksRes.data);

     
      if (res.data.book && res.data.book.image) {
        setUploadedImage(`http://localhost:8080/uploads/${res.data.book.image}`);
      }

      
      setTitle('');
      setAuthor('');
      setIsbn('');
      setImage(null);
      setPreview(null);
      alert("Book added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
  
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (userLoading) return <p>Loading user...</p>;
  if (!user) return <p>Please login</p>;
  if (user.role !== "admin") return null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="add-book-button"
        >
          {showForm ? "Hide Form" : "Add Book"}
        </button>
      </div>
      <div className={`add-book-container ${showForm ? "active" : ""}`}>
        <form onSubmit={handleSubmit} className="add-book-form">
          <h3 className="add-book-title">Add a New Book</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="add-book-input"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
            className="add-book-input"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            required
            className="add-book-input"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="add-book-file"
          />
          {preview && (
            <div className="add-book-preview">
              <p>Preview:</p>
              <img src={preview} alt="Preview" className="add-book-preview-image" />
            </div>
          )}
          <button type="submit" disabled={loading} className="add-book-button">
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>

        {uploadedImage && (
          <div className="add-book-uploaded">
            <p>Uploaded Image:</p>
            <img src={uploadedImage} alt="Uploaded Book" className="add-book-uploaded-image" />
          </div>
        )}
      </div>
    </>
  );
};

export default AddBook;