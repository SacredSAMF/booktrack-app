import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { STATUSES } from '../data/constants.js';
/*
const STATUSES = {
    wantToRead: { id: "wantToRead", label: "Want to Read" },
    reading: { id: "reading", label: "Reading" },
    finished: { id: "finished", label: "Finished" },
    };
*/


function BookCard({ book, onStatusUpdate }) {
	return (
		<div className="book-card">
			<h3>{book.title}</h3>
			<p>Author: {book.author}</p>
			<p>Year: {book.year}</p>
			<p>Genre: {book.genre}</p>
			<div className="book-card-status">
				Status: 
                <select value={book.status} className="status-select" onChange={(e) => onStatusUpdate(book.id, e.target.value)}>
                    { Object.values(STATUSES).map((statusInfo) => {
                        return (
                            <option key={statusInfo.id} value={statusInfo.id}>
                                {statusInfo.label}
                            </option>
                        );
                    }) }
				</select>
			</div>
			<ProgressBar progress={book.progress} totalPages={book.totalPages} />
		</div>
	);
}
BookCard.propTypes = {
	book: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		year: PropTypes.number,
		genre: PropTypes.string,
		status: PropTypes.string.isRequired,
		progress: PropTypes.number,
		totalPages: PropTypes.number,
	}).isRequired,
	onStatusUpdate: PropTypes.func.isRequired
};
export default BookCard;