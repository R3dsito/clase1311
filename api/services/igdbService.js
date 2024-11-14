import axios from 'axios';
import 'dotenv/config';

const igdbApi = axios.create({
  baseURL: process.env.IGDB_API_URL,
  headers: {
    'Client-ID': process.env.IGDB_CLIENT_ID,
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
  }
});


const fetchGameById = async (gameId) => {
  try {
    const response = await igdbApi.post('/games', `fields name, summary, genres, cover.url; where id = ${gameId};`);
    return response.data[0];
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    throw error;
  }
};

// Función para buscar juegos por nombre
const searchGames = async (query) => {
  try {
    const response = await igdbApi.post('/games', {name: query});
    return response.data;
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    throw error;
  }
};

export {
  fetchGameById,
  searchGames
};
