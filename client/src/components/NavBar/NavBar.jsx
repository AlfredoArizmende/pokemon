import { Link, useLocation } from "react-router-dom";
import style from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";


const NavBar = ({ setCurrentPage, setLoading }) => {
    const location = useLocation().pathname;
    console.log(location);
    return (
        <div className={style.container}>
            <Link to='/'>
                <img className={style.logoPokemon} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="Logo Pokemon" />
            </Link>
            <Link className={style.menu} to='/home'>Home</Link>
            <Link className={style.menu} to='/create'>Create a pokemon</Link>
            { location === '/home' && <SearchBar setCurrentPage={setCurrentPage} setLoading={setLoading} /> }
        </div>
    );
}


export default NavBar;