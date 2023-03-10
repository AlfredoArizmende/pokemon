import axios from 'axios';
import { GET_ALL_POKEMONS, GET_DETAIL_POKEMON, FILTER_POKEMONS_BY_SOURCE, ORDER_POKEMONS, GET_NAME_POKEMON, GET_ALL_TYPES, FILTER_POKEMONS_BY_TYPES, RESET_SEARCH, CLEAN_DETAIL, CLEAN_POKEMONS, FILTER_POKEMONS_BY_ATTACK } from './action-types';


export const getAllPokemons = () => {
    return async (dispatch) => {
        // const response = await axios.get('http://localhost:3001/pokemons'); // to work in localhost
        const response = await axios.get('https://pokemon-production-e15a.up.railway.app/pokemons'); // to work in deploy
        const pokemons = response.data;

        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons
        });
    }
}


export const getNamePokemon = (name) => {
    return async (dispatch) => {
        // const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`); // to work in localhost
        const response = await axios.get(`https://pokemon-production-e15a.up.railway.app/pokemons?name=${name}`); // to work in deploy
        const pokemon = response.data;

        return dispatch({
            type: GET_NAME_POKEMON,
            payload: pokemon
        });
    }
}


export const getDetailPokemon = (idPokemon) => {
    return async (dispatch) => {
        // const response = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`); // to work in localhost
        const response = await axios.get(`https://pokemon-production-e15a.up.railway.app/pokemons/${idPokemon}`); // to work in deploy
        const pokemon = response.data;

        return dispatch({
            type: GET_DETAIL_POKEMON,
            payload: pokemon
        });
    }
}


export const filterPokemonsByTypes = (type) => {
    return {
        type: FILTER_POKEMONS_BY_TYPES,
        payload: type
    }
}


export const filterPokemonsBySource = (source) => {
    return {
        type: FILTER_POKEMONS_BY_SOURCE,
        payload: source
    }
}

export const filterPokemonsByAttack = () => {
    return {
        type: FILTER_POKEMONS_BY_ATTACK
    }
}


export const orderPokemons = (typeOrder) => {
    return { 
        type: ORDER_POKEMONS,
        payload: typeOrder
    }
}


export const getAllTypes = () => {
    return async (dispatch) => {
        // const response = await axios.get('http://localhost:3001/types'); // to work in localhost
        const response = await axios.get('https://pokemon-production-e15a.up.railway.app/types'); // to work in deploy
        const types = response.data;

        return dispatch({
            type: GET_ALL_TYPES,
            payload: types
        });
    }
}


export const resetSearch = () => {
    return { 
        type: RESET_SEARCH
    }
}


export const cleanDetail = () => {
    return { 
        type: CLEAN_DETAIL
    }
}


export const cleanPokemons = () => {
    return { 
        type: CLEAN_POKEMONS
    }
}