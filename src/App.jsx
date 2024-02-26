import PokemonLogo from '/images/pokemon.png';
import React from 'react';
import Pokemon from './components/Pokemon';
import './styles/App.css';
import { useRequest } from './hooks/useRequest';

function App() {
  const { isLoading, data, error } = useRequest('/pokemon');

  const DisplayPokemon = () => {
    if (data) {
      return (
        <div className="row">
          {data.results.map((pokemon, index) => (
            <Pokemon key={index} pokemon={pokemon} />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const ErrorHandling = () => {
    if (isLoading) {
      return <div>Loading Pokemon data...</div>;
    } else if (error) {
      return <div>{error}: There was an error with getting data</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="app-container">
      <img src={PokemonLogo} alt="Pokemon Logo" className="pokemon-logo" />
      <DisplayPokemon />
      <ErrorHandling />
    </div>
  );
}

export default App;
