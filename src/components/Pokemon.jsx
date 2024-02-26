import React from 'react';
import { useRequest } from '../hooks/useRequest';
import '../styles/App.css'; // Import the CSS file for Pokemon component

function Pokemon({ pokemon }) {
  const { name } = pokemon;
  const { data, error } = useRequest(`/pokemon/${name}`);

  const ErrorHandling = () => {
    if (!data) {
      return <h1>Loading...</h1>;
    } else if (error) {
      return <div>{error}: There was an error with getting data</div>;
    } else {
      return null;
    }
  };

  return (
    <>
      {data && (
        <div className="card"> {/* Add the card class */}
          <span className="card-id">#{data.id}</span> {/* Add the card-id class */}
          <img src={data.sprites.front_default} alt={name} className="card-sprite" /> {/* Add the card-sprite class */}
          <h2 className="card-name">{name}</h2> {/* Add the card-name class */}
          <h3>Type</h3>
          <span className="card-details"> {/* Add the card-details class */}
            <ul className="types-list"> {/* Add the types-list class */}
              {data.types.map((type, index) => (
                <li key={index} className="pokemon-type">{type.type.name.toUpperCase()}</li>
              ))}
            </ul>
          </span>
        </div>
      )}
      <ErrorHandling />
    </>
  );
}

export default Pokemon;
