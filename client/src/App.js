import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Landing, Home, Detail, Form } from './views/index';
import NavBar from './components/NavBar/NavBar';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getAllTypes } from "./redux/actions";


const App = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { pokemons } = useSelector(state => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const lastPokemonIndex = currentPage * pokemonsPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
  const currentPokemons = pokemons.slice(firstPokemonIndex, lastPokemonIndex);

  useEffect(() => {
    dispatch(getAllPokemons())
    .then(res => setLoading(true))
    .catch(error => error);

    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <div className="App">
      { location !== '/' && <NavBar setCurrentPage={setCurrentPage} setLoading={setLoading} /> }

      <Routes>
        <Route path='' element={ <Landing /> } />
        <Route path='home' element={ <Home loading={loading} setLoading={setLoading} pokemonsPerPage={pokemonsPerPage} pokemons={pokemons} setCurrentPage={setCurrentPage} currentPage={currentPage} currentPokemons={currentPokemons} minPageNumberLimit={minPageNumberLimit} maxPageNumberLimit={maxPageNumberLimit} setMinPageNumberLimit={setMinPageNumberLimit} setMaxPageNumberLimit={setMaxPageNumberLimit} pageNumberLimit={pageNumberLimit} /> } />
        <Route path='detail/:idPokemon' element={ <Detail /> } />
        <Route path='create' element={ <Form setLoading={setLoading} /> } />
      </Routes>
    </div>
  );
}


export default App;