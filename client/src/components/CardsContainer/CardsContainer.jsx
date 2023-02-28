import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, filterPokemonsBySource, orderPokemons, getAllTypes, filterPokemonsByTypes } from "../../redux/actions";
import style from './CardsContainer.module.css';
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import Pagination from "../../components/Pagination/Pagination";


const CardsContainer = () => {
    const dispatch = useDispatch();

    const { pokemons, types } = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const currentPokemons = pokemons.slice(firstPokemonIndex, lastPokemonIndex);

    useEffect(() => {
        dispatch(getAllPokemons())
            .then(res => setLoading(true))
            .catch(error => error);

        dispatch(getAllTypes());
    }, [dispatch]);
    
    const filterPokemonsByTypesHandler = (event) => {
        dispatch(filterPokemonsByTypes(event.target.value));
        setCurrentPage(1);
    }

    const filterPokemonsBySourceHandler = (event) => {
        dispatch(filterPokemonsBySource(event.target.value));
        setCurrentPage(1);
    }

    const orderPokemonsHandler = (event) => {
        dispatch(orderPokemons(event.target.value));
        setCurrentPage(1);
    }

    const loadAllPokemonsHandler = () => {
        setLoading(false);
        dispatch(getAllPokemons())
            .then(res => setLoading(true))
            .catch(error => error);
    }
    
    return (
        <div>
            <div className={style.containerFilters}>
                <select className={style.selectBox} onChange={filterPokemonsByTypesHandler}>
                    <option value="all">All types</option>
                    {
                        types.map(type => {
                            return (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            )
                        })
                    }
                </select>

                <select className={style.selectBox} onChange={filterPokemonsBySourceHandler}>
                    <option value="all">All Pokemos</option>
                    <option value="db">Created</option>
                    <option value="api">API</option>
                </select>

                <select className={style.selectBox} onChange={orderPokemonsHandler}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                    <option value="name">By Name</option>
                    <option value="attack">By Attack</option>
                </select>

                <button className={style.btnAllPokemon} onClick={loadAllPokemonsHandler}>Load All Pokemons</button>
            </div>
            <div>
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    pokemons={pokemons.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {
                loading
                    ? <div className={style.container}>
                        {
                            currentPokemons.map(pokemon => {
                                return (
                                    <Card
                                        key={pokemon.id}
                                        id={pokemon.id}
                                        name={pokemon.name}
                                        image={pokemon.image}
                                        attack={pokemon.attack}
                                        types={
                                            pokemon.types.map(type => type)
                                        }
                                    />
                                );
                            })
                        }
                      </div>
                    : <Loading />
            }
        </div>
    );
}


export default CardsContainer;