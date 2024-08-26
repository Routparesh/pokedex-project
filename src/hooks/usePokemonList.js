import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList(url, type) {
	const [pokemonListState, setPokemonListState] = useState({
		pokemonList: [],
		isLodding: true,
		pokedex_url: url,
		nextUrl: '',
		prevUrl: '',
	});

	async function downloadpokemons() {
		const response = await axios.get(pokemonListState.pokedex_url);
		const pokemonResults = response.data.results;

		if (type) {
			setPokemonListState((state) => ({
				...state,
				pokemonList: response.data.pokemon.slice(0, 5),
			}));
		} else {
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

			setPokemonListState((prevState) => ({
				...prevState,
				nextUrl: response.data.next,
				prevUrl: response.data.previous,
				pokemonList: res,
				isLodding: false,
			}));
		}
	}

	useEffect(() => {
		downloadpokemons();
	}, [pokemonListState.pokedex_url]);

	return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
