import express from 'express';

import {
    getGameById, searchGamesController
  } from '../controllers/gameController.js';
  
const gameRoutes = express.Router();


gameRoutes.get('/:id', getGameById);


gameRoutes.get('/search', searchGamesController);

export {gameRoutes};