import axios from 'axios';
import { useEffect, useState } from 'react';
function usePokemonDetails(id) {
	let [pokemon, setPokemon] = useState({});
	let pokemonListHookResponse = [];
	async function downloadDetails() {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
		console.log(response.data);

		setPokemon({
			name: response.data.name,
			image: response.data.sprites.other.dream_world.front_default,
			weight: response.data.weight,
			height: response.data.height,
			type: response.data.types.map((t) => t.type.name),
		});
	}

	useEffect(() => {
		downloadpokemons();
		console.log('list', pokemonListState);
	}, []);
}

export default usePokemonDetails();
