import React, { useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';

const Pokedex = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className="pokedex-wrapper">
			<Search updateSearchterm={setSearchTerm} />

			{searchTerm.length === 0 ? <PokemonList /> : ''}
		</div>
	);
};

export default Pokedex;
