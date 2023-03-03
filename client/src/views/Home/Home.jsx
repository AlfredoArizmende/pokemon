import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";


const Home = ({ loading, setLoading, pokemonsPerPage, pokemons, setCurrentPage, currentPage, currentPokemons, minPageNumberLimit, maxPageNumberLimit, setMinPageNumberLimit, setMaxPageNumberLimit, pageNumberLimit }) => {
    return (
        <div>
            <CardsContainer loading={loading} setLoading={setLoading} pokemonsPerPage={pokemonsPerPage} pokemons={pokemons} setCurrentPage={setCurrentPage} currentPage={currentPage} currentPokemons={currentPokemons} minPageNumberLimit={minPageNumberLimit} maxPageNumberLimit={maxPageNumberLimit} setMinPageNumberLimit={setMinPageNumberLimit} setMaxPageNumberLimit={setMaxPageNumberLimit} pageNumberLimit={pageNumberLimit} />
        </div>
    );
}


export default Home;