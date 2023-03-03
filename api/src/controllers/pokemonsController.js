const axios = require('axios');
const { Pokemon, Type } = require('../db');


const cleanArrayDb = (array) => {
    const cleanDb = array.map(element => {
        return {
            id: element.id,
            name: element.name,
            hp: element.hp,
            attack: element.attack,
            defense: element.defense,
            speed: element.speed,
            height: element.height,
            weight: element.weight,
            image: element.image,
            types: element.Types.map(type => type.name),
            created: element.created
        }
    });

    return cleanDb;
}


const cleanArray = (array) => {
    const clean = array.map(element => {
        return {
            id: element.id,
            name: element.name,
            hp: element.stats[0].base_stat,
            attack: element.stats[1].base_stat,
            defense: element.stats[2].base_stat,
            speed: element.stats[5].base_stat,
            height: element.height,
            weight: element.weight,
            image: element.sprites.other.home.front_default,
            types: element.types.map(type => type.type.name),
            created: false
        }
    });

    return clean;
}


const getAllPokemons = async () => {
    const dbPokemonRaw = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });
    const apiPokemonRaw = [];

    for (let i = 1; i < 101; i++){
        apiPokemonRaw.push((await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)).data);
    }

    const dbPokemon = cleanArrayDb(dbPokemonRaw);
    const apiPokemon = cleanArray(apiPokemonRaw);

    const results = [...dbPokemon, ...apiPokemon];

    return results;
}

const apiSearchById = async (idPokemon) => {
    try {
        const apiPokemonRaw = (await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
    
        return apiPokemonRaw;   
    } catch (error) {
        return [];
    }
}

const getPokemonById = async (idPokemon, source) => {
    const pokemonRaw =
        source === 'api'
        ? await apiSearchById(idPokemon)
        : await Pokemon.findByPk(idPokemon, {
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }
    });

    if (source === 'api') {
        if (pokemonRaw.length < 1) throw new Error(`The Pokemon with id ${idPokemon} does not exist in the api`);
         
        return {
            id: pokemonRaw.id,
            name: pokemonRaw.name,
            hp: pokemonRaw.stats[0].base_stat,
            attack: pokemonRaw.stats[1].base_stat,
            defense: pokemonRaw.stats[2].base_stat,
            speed: pokemonRaw.stats[5].base_stat,
            height: pokemonRaw.height,
            weight: pokemonRaw.weight,
            image: pokemonRaw.sprites.other.home.front_default,
            types: pokemonRaw.types.map(type => type.type.name),
            created: false
        }
    }

    if (pokemonRaw === null) throw new Error(`The Pokemon with id ${idPokemon} does not exist in the database`);

    return {
        id: pokemonRaw.id,
        name: pokemonRaw.name,
        hp: pokemonRaw.hp,
        attack: pokemonRaw.attack,
        defense: pokemonRaw.defense,
        speed: pokemonRaw.speed,
        height: pokemonRaw.height,
        weight: pokemonRaw.weight,
        image: pokemonRaw.image,
        types: pokemonRaw.Types.map(type => type.name),
        created: pokemonRaw.created
    }
}


const apiSearchByName = async (name) => {
    try {
        const apiPokemonRaw = [(await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)).data];
        const apiPokemon = cleanArray(apiPokemonRaw);
    
        return apiPokemon;   
    } catch (error) {
        return [];
    }
}


const getPokemonByName = async (name) => {
    const cleanName = name.trim().toLowerCase();
    const dbPokemonRaw = await Pokemon.findAll({ 
        where: { name: cleanName },
        include: {
            model: Type,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });
    const dbPokemon = cleanArrayDb(dbPokemonRaw);
    const apiPokemon = await apiSearchByName(cleanName);

    const results = [...dbPokemon, ...apiPokemon]

    if (!results.length) throw new Error(`The Pokemon with the name ${name} does not exist`);

    return results;
}


const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
    const verifyPokemon = await Pokemon.findAll({ 
        where: { name: name }
    });

    if (verifyPokemon.length > 0) throw new Error(`The Pokemon with the name ${name} already exists`);

    const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });

    const pokemonType = await Type.findAll({
        where: { name: types}
    });

    newPokemon.addType(pokemonType);
    
    return newPokemon;
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemon
}