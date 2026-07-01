import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddBookForm({ onAddBook, onCloseForm }) {
	// State for form data will go here
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        totalPages: ''
    });

	// handleChange function will go here
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	// handleSubmit function will go here
	const handleSubmit = (e) => {
		e.preventDefault();

        if( !formData.title || !formData.author || !formData.totalPages) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        console.log('formData:', formData);

        const newBook = {
            id: Date.now().toString(), // Simple unique ID based on timestamp
            ...formData,
            year: new Date().getFullYear(), // Default to current year
            genre: "Unknown", // Default genre
            status: "wantToRead", // Default status
            progress: 0, // Default progress
        };

        console.log('newBook:', newBook);

        newBook.totalPages = parseInt(newBook.totalPages, 10); // Ensure totalPages is a number

		onAddBook(newBook);
		setFormData({
			title: '',
			author: '',
			totalPages: ''
		});
        onCloseForm();
	};

	return (
		<div className="modal-overlay">
            <div className="modal-content add-book-form">
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="author">Author:</label>
                        <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="totalPages">Total Pages:</label>
                        <input type="number" id="totalPages" name="totalPages" value={formData.totalPages} onChange={handleChange} required />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">Add Book</button>
                        <button type="button" className="btn-secondary" onClick={onCloseForm}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
	);
}

AddBookForm.propTypes = {
	onAddBook: PropTypes.func.isRequired,
	onCloseForm: PropTypes.func.isRequired,
};

export default AddBookForm;