import React from 'react';
import './Search.css';

const Search = ({ updateSearchterm }) => {
	return (
		<div className="search-wrapper">
			<input
				onChange={(e) => updateSearchterm(e.target.value)}
				id="pokemon-name-search"
				type="text"
				placeholder="pokemon name"
			/>
		</div>
	);
};

export default Search;
