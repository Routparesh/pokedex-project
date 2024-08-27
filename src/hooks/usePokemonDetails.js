import axios from 'axios';
import { useEffect, useState } from 'react';

import usePokemonList from './usePokemonList';

function usePokemonDetails(id, pokemonName) {
	const [pokemon, setPokemon] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [pokemonListState, setPokemonListState] = usePokemonList(true);

	async function downloadDetails() {
		try {
			let response;
			if (pokemonName) {
				response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
			} else {
				response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			}

			console.log(response.data);

			setPokemon({
				name: response.data.name,
				image: response.data.sprites.other.dream_world.front_default,
				weight: response.data.weight,
				height: response.data.height,
				type: response.data.types.map((t) => t.type.name),
			});

			setPokemonListState({
				...pokemonListState,
				pokedex_url: `https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`,
			});

			setIsLoading(false);
		} catch (error) {
			console.error('Error downloading Pokemon details:', error);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (id || pokemonName) {
			downloadDetails();
		}
	}, [id, pokemonName]);

	return { pokemon, isLoading, pokemonListState };
}

export default usePokemonDetails;
