import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GameSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/games/search?q=${query}`);
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      setError('No se pudo realizar la búsqueda');
      setLoading(false);
    }
  };

  
  return (
    <div>
      <h2>Buscar Juegos</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingrese el nombre del juego"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
