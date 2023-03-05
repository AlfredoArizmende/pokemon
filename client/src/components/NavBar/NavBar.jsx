import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logoPokemon from '../../images/PokemonLogo.png';
import style from './NavBar.module.css';


const NavBar = ({ setCurrentPage, setLoading }) => {
    const location = useLocation().pathname;

    return (
        <div className={style.container}>
            <Link to='/'>
                <img className={style.logoPokemon} src={logoPokemon} alt="Logo Pokemon" />
            </Link>
            <Link className={style.menu} to='/home'>Home</Link>
            <Link className={style.menu} to='/create'>Create a pokemon</Link>
            { location === '/home' && <SearchBar setCurrentPage={setCurrentPage} setLoading={setLoading} /> }
        </div>
    );
}


export default NavBar;