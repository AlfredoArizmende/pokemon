import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, filterPokemonsBySource, orderPokemons, filterPokemonsByTypes, resetSearch, filterPokemonsByAttack } from "../../redux/actions";
import style from './CardsContainer.module.css';
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import Pagination from "../../components/Pagination/Pagination";


const CardsContainer = ({ loading, setLoading, pokemonsPerPage, pokemons, setCurrentPage, currentPage, currentPokemons, minPageNumberLimit, maxPageNumberLimit, setMinPageNumberLimit, setMaxPageNumberLimit, pageNumberLimit }) => {
    const dispatch = useDispatch();
    const { types } = useSelector(state => state);
    const [selectTypes, setSelectTypes] = useState('');
    const [selectSource, setSelectSource] = useState('');
    const [selectOrder, setSelectOrder] = useState('');

    const filterPokemonsByTypesHandler = (event) => {
        setSelectTypes(event.target.value);
        dispatch(filterPokemonsByTypes(event.target.value));
        setCurrentPage(1);
    }

    const filterPokemonsBySourceHandler = (event) => {
        setSelectSource(event.target.value);
        dispatch(filterPokemonsBySource(event.target.value));
        setCurrentPage(1);
    }

    const orderPokemonsHandler = (event) => {
        setSelectOrder(event.target.value);
        dispatch(orderPokemons(event.target.value));
        setCurrentPage(1);
    }

    const filterPokemonsByAttackHandler = () => {
        dispatch(filterPokemonsByAttack());
        setCurrentPage(1);
    }

    const loadAllPokemonsHandler = () => {
        setLoading(false);
        dispatch(getAllPokemons())
            .then(() => setLoading(true))
            .catch(error => error);
        
        setCurrentPage(1);
    }

    const resetSearchHandler = () => {
        setSelectTypes('');
        setSelectSource('');
        setSelectOrder('');
        dispatch(resetSearch());
    }
    
    return (
        <div>
            <div className={style.containerFilters}>
                <button className={style.btnAllPokemon} onClick={filterPokemonsByAttackHandler}>Filter by attack less than 70</button>

                <select className={style.selectBox} onChange={filterPokemonsByTypesHandler} value={selectTypes}>
                    <option value="all">All Types</option>
                    {
                        types.map(type => {
                            return (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            )
                        })
                    }
                </select>

                <select className={style.selectBox} onChange={filterPokemonsBySourceHandler} value={selectSource}>
                    <option value="all">All Pokemos</option>
                    <option value="db">Created</option>
                    <option value="api">API</option>
                </select>

                <select className={style.selectBox} onChange={orderPokemonsHandler} value={selectOrder}>
                    <option value="asc">ID Ascending</option>
                    <option value="desc">ID Descending</option>
                    <option value="name">By Name</option>
                    <option value="attack">By Attack</option>
                </select>

                <button className={style.btnAllPokemon} onClick={loadAllPokemonsHandler}>Load All Pokemons</button>

                <button className={style.btnAllPokemon} onClick={resetSearchHandler}>Reset Search</button>
            </div>
            <div>
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    pokemonsLength={pokemons.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    minPageNumberLimit={minPageNumberLimit}
                    maxPageNumberLimit={maxPageNumberLimit}
                    setMinPageNumberLimit={setMinPageNumberLimit}
                    setMaxPageNumberLimit={setMaxPageNumberLimit}
                    pageNumberLimit={pageNumberLimit}
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