import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';

const PokemonList = () => {
	let [pokemonList, setpokemonList] = useState([]);
	let [isLodding, setisLodding] = useState(true);

	let [pokedex_url, setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	let [nextUrl, setnextUrl] = useState('');
	let [prevUrl, setprevUrl] = useState('');

	async function downloadpokemons() {
		const response = await axios.get(pokedex_url);
		const pokemonResults = response.data.results;

		console.log(response.data);

		setnextUrl(response.data.next);
		setprevUrl(response.data.previous);

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
		console.log(res);
		setpokemonList(res);
		setisLodding(false);
	}

	useEffect(() => {
		downloadpokemons();
	}, [pokedex_url]);

	return (
		<div className="pokemon-list-wrapper">
			<div className="pokemon-wrapper">
				{isLodding
					? 'Loding...'
					: pokemonList.map((p) => <Pokemon key={p.id} name={p.name} img={p.image} />)}
			</div>

			<div className="controlls">
				<button
					disabled={prevUrl === null}
					onClick={() => {
						setpokedexUrl(prevUrl);
					}}>
					Prv
				</button>
				<button disabled={nextUrl === null} onClick={() => setpokedexUrl(nextUrl)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default PokemonList;
