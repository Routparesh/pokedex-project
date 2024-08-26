import { React } from 'react';

import usePokemonList from '../../hooks/usePokemonList';
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';

const PokemonList = () => {
	const [pokemonListState, setPokemonListState] = usePokemonList(
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
						setPokemonListState({ ...pokemonListState, pokedex_url: pokemonListState.prevUrl });
					}}>
					Prv
				</button>
				<button
					disabled={pokemonListState.nextUrl === null}
					onClick={() =>
						setPokemonListState({ ...pokemonListState, pokedex_url: pokemonListState.nextUrl })
					}>
					Next
				</button>
			</div>
		</div>
	);
};

export default PokemonList;
