const { getAllPokemons, getPokemonById, getPokemonByName, createPokemon } = require('../controllers/pokemonsController');


const getAllPokemonsHandler = async (req, res) => {
    const { name } = req.query;
    
    try {
        const results = name ? await getPokemonByName(name) : await getAllPokemons();
        return res.status(200).send(results);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const getDetailPokemonHandler = async (req, res) => {
    const { idPokemon } = req.params;
    const source = isNaN(idPokemon) ? 'db' : 'api';

    try {
        const pokemon = await getPokemonById(idPokemon, source);
        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const createPokemonHandler = async (req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, type } = req.body;

    try {
        const newPokemon = await createPokemon(name, image, hp, attack, defense, speed, height, weight, type);
        return res.status(201).json(newPokemon);   
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllPokemonsHandler,
    getDetailPokemonHandler,
    createPokemonHandler
}