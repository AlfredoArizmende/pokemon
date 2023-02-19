const { Router } = require('express');
const pokemonsRouter = Router();
const { getAllPokemonsHandler, getDetailPokemonHandler, createPokemonHandler } = require('../handlers/pokemonsHandler');


pokemonsRouter.get('/', getAllPokemonsHandler);
pokemonsRouter.get('/:idPokemon', getDetailPokemonHandler);
pokemonsRouter.post('/', createPokemonHandler);


module.exports = pokemonsRouter;