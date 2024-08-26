import axios from 'axios';
import { useEffect, useState } from 'react';

import usePokemonList from './usePokemonList';

function usePokemonDetails(id) {
	const [pokemon, setPokemon] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [pokemonListState, setPokemonListState] = usePokemonList(true);

	async function downloadDetails() {
		try {
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
		if (id) {
			downloadDetails();
		}
	}, [id]);

	return { pokemon, isLoading, pokemonListState };
}

export default usePokemonDetails;
