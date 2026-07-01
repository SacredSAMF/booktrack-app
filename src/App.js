import React, { useState, useEffect } from 'react';
import './components.css'; // Import shared component styles
import BookList from './components/BookList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AddBookForm from './components/AddBookForm';
function App() {

    // State for books fetched from the API
	const [books, setBooks] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3001/books')
			.then(response => response.json())
			.then(data => setBooks(data))
			.catch(error => console.error("Error fetching data:", error));
	}, []);

    // Books search state and filtering
    const [booksSearch, setBooksSearch] = useState('');
    const filteredBooks = booksSearch ? books.filter(book =>
        book.title.toLowerCase().includes(booksSearch.toLowerCase()) ||
        book.author.toLowerCase().includes(booksSearch.toLowerCase())
    ) : books;

    // Defining state for form visibility
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Function to handle adding a new book
    const handleAddBook = (newBookData) => {
        fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBookData)
            })
			.then(response => response.json())
			.then(data => setBooks([...books, data]))
			.catch(error => console.error("Error fetching data:", error));
    };

    // Function to update book status
    const handleStatusUpdate = (bookId, newStatus) => {
        fetch(`http://localhost:3001/books/${bookId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            })
			.then(response => response.json())
			.then(data => {
                const updatedBooks = books.map(book => book.id === bookId ? {...book, status: newStatus} : book)
                setBooks(updatedBooks);
            })
			.catch(error => console.error("Error fetching data:", error));


        const updatedBooks = books.map(book => {
            if (book.id === bookId) {
                return { ...book, status: newStatus };
            }
            return book;
        });
        setBooks(updatedBooks);
    };

	return (
		<div className="app-container">
			<Header onAddNewBookClick={() => setIsFormVisible(true)} />
			<main>
                <SearchBar searchTerm={booksSearch} onSearchChange={(e) => setBooksSearch(e.target.value)} />
                {isFormVisible ? (<AddBookForm onAddBook={handleAddBook} onCloseForm={() => setIsFormVisible(false)} />) : null }
				<BookList books={filteredBooks} onStatusUpdate={handleStatusUpdate} />
			</main>
		</div>
	);
}
export default App;
