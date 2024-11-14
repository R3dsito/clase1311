import axios from 'axios';

// Función para obtener un juego por su ID
export const fetchGameById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/games/${id}`);  // Suponiendo que tu backend está corriendo en /api
    return response.data;
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    throw error;
  }
};

// Función para buscar juegos
export const searchGames = async (query) => {
  try {
    const response = await axios.get(`http://localhost:3000/games/search?q=${query}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error('Error buscando juegos:', err);
    return [];
  }
};
