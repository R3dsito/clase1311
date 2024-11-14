import { fetchGameById, searchGames } from '../services/igdbService.js';

export const getGameById = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await fetchGameById(id);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchGamesController = async (req, res) => {
  const { q } = req.query;

  try {
    const games = await searchGames(q);
    if (games.length === 0) {
      return res.status(404).json({ message: 'No se encontraron juegos' });
    }
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchProjects = async (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    try {
      const projects = await Projects.find({ name: { $regex: name, $options: 'i' } });
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  