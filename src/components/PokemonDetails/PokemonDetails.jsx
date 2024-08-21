import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePokemonList from '../../hooks/usePokemonList';
import './pokemonDetails.css';

const PokemonDetails = () => {
	let { id } = useParams();

	let [pokemon, setPokemon] = useState({});

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

	const [pokemonListState, setpokemonListState] = usePokemonList(
		'https://pokeapi.co/api/v2/type/fire',
		true
	);
	useEffect(() => {
		downloadDetails();
		console.log('list', pokemonListState);
	}, []);

	return (
		<div className="pokemon-details-wrapper">
			<img className="pokemon-details-image" src={pokemon.image} alt="" srcset="" />
			<div className="pokemon-details-name">
				<span>{pokemon.name}</span>{' '}
			</div>
			<div className="pokemon-details-name">Weight: {pokemon.weight}</div>
			<div className="pokemon-details-name">Height: {pokemon.height}</div>
			<div className="pokemon-details-types">
				{pokemon.type && pokemon.type.map((t) => <div key={t}>{t}</div>)}
			</div>

			<div>More Fire Type Pokemon</div>
		</div>
	);
};

export default PokemonDetails;
