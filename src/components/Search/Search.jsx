import React from 'react';
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

const Search = ({ updateSearchterm }) => {
	const DebounceCallBack = useDebounce((e) => updateSearchterm(e.target.value));
	return (
		<div className="search-wrapper">
			<input
				onChange={DebounceCallBack}
				id="pokemon-name-search"
				type="text"
				placeholder="pokemon name"
			/>
		</div>
	);
};

export default Search;
