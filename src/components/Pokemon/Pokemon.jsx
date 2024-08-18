import React from 'react';
import { Link } from 'react-router-dom';
import './Pokemon.css';

const Pokemon = ({ name, img, id }) => {
	return (
		<div className="pokemon">
			<Link to={`pokemon/${id}`}>
				<div className="pokemon-name">{name}</div>
				<div>
					<img className="pokemon-img" src={img} alt="" srcset="" />
				</div>
			</Link>
		</div>
	);
};

export default Pokemon;
