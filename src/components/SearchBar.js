import React from 'react';
import PropTypes from 'prop-types';
function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search by title or author..."
                className="search-input"
                value={searchTerm}
                onChange={onSearchChange}
            />
        </div>
    );
}
SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};
export default SearchBar;