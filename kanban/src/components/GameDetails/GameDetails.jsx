import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetails = () => {
  const { id } = useParams();  
  const [game, setGame] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {

    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}`);
        setGame(response.data);  
        setLoading(false); 
      } catch (err) {
        setError('No se pudo obtener el juego');
        setLoading(false); 
      }
    };

    fetchGameDetails();  
  }, [id]);  

  
  if (loading) {
    return <div>Cargando...</div>;
  }

  
  if (error) {
    return <div>{error}</div>;
  }

 
  return (
    <div>
      <h1>{game.name}</h1>
      {game.cover && <img src={game.cover.url} alt={game.name} />}  {/* Si hay portada, muéstrala */}
      <p>{game.summary}</p>
      <h3>Géneros:</h3>
      <ul>
        {game.genres && game.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetails;
