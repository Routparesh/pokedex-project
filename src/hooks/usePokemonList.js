import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList(type) {
	const [pokemonListState, setPokemonListState] = useState({
		pokemonList: [],
		isLodding: true,
		pokedex_url: 'https://pokeapi.co/api/v2/pokemon',
		nextUrl: '',
		prevUrl: '',
	});

	async function downloadpokemons() {
		const response = await axios.get(pokemonListState.pokedex_url);
		const pokemonResults = response.data.results;

		if (type) {
			const pokemonResults = response.data.pokemon;

			if (pokemonResults) {
				const filteredPokemon = pokemonResults.slice(0, 5).map((poke) => ({
					name: poke.pokemon.name,
					url: poke.pokemon.url,
				}));

				setPokemonListState((state) => ({
					...state,
					pokemonList: filteredPokemon,
					isLoading: false,
				}));
			}
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
