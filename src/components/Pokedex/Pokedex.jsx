import React, { useState } from 'react';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';

const Pokedex = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className="pokedex-wrapper">
			<Search updateSearchterm={setSearchTerm} />

			{!searchTerm ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} />}
		</div>
	);
};

export default Pokedex;
