import { React, useState } from 'react';

import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';
import usePokemonList from '../../hooks/usePokemonList';

const PokemonList = () => {
	const { pokemonListState, setpokemonListState } = usePokemonList(
		'https://pokeapi.co/api/v2/pokemon',
		false
	);

	return (
		<div className="pokemon-list-wrapper">
			<div className="pokemon-wrapper">
				{pokemonListState.isLodding
					? 'Loding...'
					: pokemonListState.pokemonList.map((p) => (
							<Pokemon key={p.id} name={p.name} img={p.image} id={p.id} />
					  ))}
			</div>

			<div className="controlls">
				<button
					disabled={pokemonListState.prevUrl === null}
					onClick={() => {
						setpokemonListState({ ...pokemonListState, pokedex_url: pokemonListState.prevUrl });
					}}>
					Prv
				</button>
				<button
					disabled={pokemonListState.nextUrl === null}
					onClick={() =>
						setpokemonListState({ ...pokemonListState, pokedex_url: pokemonListState.nextUrl })
					}>
					Next
				</button>
			</div>
		</div>
	);
};

export default PokemonList;
