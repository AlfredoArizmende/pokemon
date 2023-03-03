import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';


const Landing = () => {
    return (
        <div className={style.container}>
            <Link to='/home'>
                {/* <div className={style.box}> */}
                    <div className={style.btnPoke}>
                        <span className={style.btnPokeText}>Enter</span>
                        <img className={style.poke1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png" alt="Pokeball1" />
                        <img className={style.poke2} src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png/800px-Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png" alt="Pokeball2" />
                        <img className={style.poke3} src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png" alt="Pokeball3" />
                        <img className={style.poke4} src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png" alt="Pokeball4" />
                    </div>
                {/* </div> */}
            </Link>
        </div>
    );
}


export default Landing;