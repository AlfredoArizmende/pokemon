import axios from 'axios';
import { GET_ALL_POKEMONS, GET_DETAIL_POKEMON, FILTER_POKEMONS_BY_SOURCE, ORDER_POKEMONS, GET_NAME_POKEMON, GET_ALL_TYPES, FILTER_POKEMONS_BY_TYPES } from './action-types';


export const getAllPokemons = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/pokemons');
        const pokemons = response.data;

        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons
        });
    }
}


export const getNamePokemon = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        const pokemon = response.data;

        return dispatch({
            type: GET_NAME_POKEMON,
            payload: pokemon
        });
    }
}


export const getDetailPokemon = (idPokemon) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`);
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


export const orderPokemons = (typeOrder) => {
    return { 
        type: ORDER_POKEMONS,
        payload: typeOrder
    }
}


export const getAllTypes = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/types');
        const types = response.data;

        return dispatch({
            type: GET_ALL_TYPES,
            payload: types
        });
    }
}