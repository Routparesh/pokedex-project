import React from 'react';
import { useParams } from 'react-router-dom';
import usePokemonDetails from '../../hooks/usePokemonDetails';
import './pokemonDetails.css';

const PokemonDetails = ({ pokemonName }) => {
	let { id } = useParams();
	const { pokemon, pokemonListState, isLoading } = usePokemonDetails(id, pokemonName);
	return (
		<div className="pokemon-details-wrapper">
			<img className="pokemon-details-image" src={pokemon.image} alt="" srcset="" />
			<div className="pokemon-details-name">
				<span>{pokemon.name}</span>
			</div>
			<div className="pokemon-details-name">Weight: {pokemon.weight}</div>
			<div className="pokemon-details-name">Height: {pokemon.height}</div>
			<div className="pokemon-details-types">
				{pokemon.type && pokemon.type.map((t) => <div key={t}>{t}</div>)}
			</div>

			<div>
				More
				{pokemon.type && pokemon.type.map((t) => <span key={t}> {t} </span>)}
				Type Pokemon
				<ul>
					{pokemonListState.pokemonList &&
						pokemonListState.pokemonList.map((p) => <li key={p.url}>{p.name}</li>)}
				</ul>
			</div>
		</div>
	);
};

export default PokemonDetails;
