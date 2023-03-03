import { GET_ALL_POKEMONS, GET_DETAIL_POKEMON, FILTER_POKEMONS_BY_SOURCE, ORDER_POKEMONS, GET_NAME_POKEMON, GET_ALL_TYPES, FILTER_POKEMONS_BY_TYPES, RESET_SEARCH, CLEAN_DETAIL, CLEAN_POKEMONS } from './action-types';


const initialState = {
    pokemons: [],
    allPokemons: [],
    detailPokemon: {},
    types: []
 };


 const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload
        }

      case GET_NAME_POKEMON:
        return {
          ...state,
          pokemons: action.payload
        }
      
      case GET_DETAIL_POKEMON:
        return {
          ...state,
          detailPokemon: action.payload
        }
        
      case GET_ALL_TYPES:
        return {
          ...state,
          types: action.payload
        }

      case RESET_SEARCH:
        return {
          ...state,
          pokemons: state.allPokemons
        }

      case CLEAN_POKEMONS:
        return {
          ...state,
          pokemons: []
        }

      case CLEAN_DETAIL:
        return {
          ...state,
          detailPokemon: {}
        }

      case FILTER_POKEMONS_BY_TYPES:
        let typesFiltered = action.payload === 'all'
                            ? state.allPokemons
                            : state.allPokemons.filter(pokemon => pokemon.types.includes(action.payload));


        return {
          ...state,
          pokemons: typesFiltered
        }

      case FILTER_POKEMONS_BY_SOURCE:
        let sourceFiltered;

        if (action.payload === 'all') {
          sourceFiltered = state.allPokemons;
        } 
        
        if (action.payload === 'db') {
            sourceFiltered = state.allPokemons.filter(pokemon => pokemon.created === true);
        }

        if (action.payload === 'api') {
            sourceFiltered = state.allPokemons.filter(pokemon => pokemon.created === false);
        }

        return {
            ...state,
            pokemons: sourceFiltered
        }

      case ORDER_POKEMONS:
        let sortFiltered;

        if (action.payload === 'asc') {
            // sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => pokemon1.id - pokemon2.id);
            sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => {
                const idA = [];
                const idB = [];
                const idStrA = pokemon1.id.toString();
                const idStrB = pokemon2.id.toString();
                const idStringA = idStrA.split('-').at(-1);
                const idStringB = idStrB.split('-').at(-1);
                
                for (let i = 0; i < idStringA.length; i++) {
                  const isNum = Number(idStringA[i]);
                    if (!isNaN(isNum)) idA.push(isNum);
                }
                
                for (let i = 0; i < idStringB.length; i++) {
                  const isNum = Number(idStringB[i]);
                    if (!isNaN(isNum)) idB.push(isNum);
                }
                
                const newIdA = Number(idA.join(''));
                const newIdB = Number(idB.join(''));
                
                if (newIdA < newIdB) {
                  return -1;
                }
                if (newIdA > newIdB) {
                  return 1;
                }
                return 0;
                
              });
        }

        if (action.payload === 'desc') {
            // sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => pokemon2.id - pokemon1.id);
            sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => {
                const idA = [];
                const idB = [];
                const idStrA = pokemon1.id.toString();
                const idStrB = pokemon2.id.toString();
                const idStringA = idStrA.split('-').at(-1);
                const idStringB = idStrB.split('-').at(-1);
                
                for (let i = 0; i < idStringA.length; i++) {
                  const isNum = Number(idStringA[i]);
                    if (!isNaN(isNum)) idA.push(isNum);
                }
                
                for (let i = 0; i < idStringB.length; i++) {
                  const isNum = Number(idStringB[i]);
                    if (!isNaN(isNum)) idB.push(isNum);
                }
                
                const newIdA = Number(idA.join(''));
                const newIdB = Number(idB.join(''));
                
                if (newIdA > newIdB) {
                  return -1;
                }
                if (newIdA < newIdB) {
                  return 1;
                }
                return 0;
                
              });
        }

        if (action.payload === 'name') {
            sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => {
                if (pokemon1.name < pokemon2.name) {
                  return -1;
                }
                if (pokemon1.name > pokemon2.name) {
                  return 1;
                }
              
                return 0;
              });
        }

        if (action.payload === 'attack') {
            sortFiltered = state.pokemons.sort((pokemon1, pokemon2) => pokemon1.attack - pokemon2.attack);
        }

        return {
            ...state,
            pokemons: sortFiltered
        }
            
      default:
        return { ...state };
    }
 }


 export default reducer;