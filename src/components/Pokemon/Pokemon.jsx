import React from 'react';
import './Pokemon.css';

const Pokemon = ({ name, img }) => {
	return (
		<div className="pokemon">
			<div className="pokemon-name">{name}</div>
			<div>
				<img className="pokemon-img" src={img} alt="" srcset="" />
			</div>
		</div>
	);
};

export default Pokemon;
