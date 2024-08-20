import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';

const PokemonList = () => {
	let [pokemonListState, setpokemonListState] = useState({
		pokemonList: [],
		isLodding: true,
		pokedex_url: 'https://pokeapi.co/api/v2/pokemon/',
		nextUrl: '',
		prevUrl: '',
	});

	async function downloadpokemons() {
		const response = await axios.get(pokemonListState.pokedex_url);
		const pokemonResults = response.data.results;

		const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
		const pokemonData = await axios.all(pokemonResultPromise);

		const res = pokemonData.map((pokeData) => {
			const pokemon = pokeData.data;
			return {
				id: pokemon.id,
				name: pokemon.name,
				image: pokemon.sprites.other.dream_world.front_default,
				types: pokemon.types,
			};
		});

		setpokemonListState((prevState) => ({
			...prevState,
			nextUrl: response.data.next,
			prevUrl: response.data.previous,
			pokemonList: res,
			isLodding: false,
		}));
	}

	useEffect(() => {
		downloadpokemons();
	}, [pokemonListState.pokedex_url]);

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
