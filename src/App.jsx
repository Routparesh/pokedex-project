import { Link } from 'react-router-dom';
import './App.css';
import CustomeRoute from './Routes/CustomeRoute';

function App() {
	return (
		<div className="outer-pokedex">
			<h1 id="pokedex-heading">
				<Link to="/">Pokedex</Link>
			</h1>

			<CustomeRoute />
		</div>
	);
}

export default App;
