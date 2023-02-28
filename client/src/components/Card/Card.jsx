import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';


const Card = (props) => {
    return (
        <Link to={`/detail/${props.id}`}>
            <div className={style.container}>
                <div className={style.perspective}>
                    <div className={`${style.bgCard} ${style[`${props.types[0]}BgCard`]}`}>
                        <div className={`${style.bgCardGif} ${style[`${props.types[0]}BgCardGif`]}`}></div>
                        <div className={style.headerPokemon}>
                            <div className={`${style.typeImage} ${style[`${props.types[0]}TypeImage`]}`}></div>
                            <div className={style.name}><h2>{ props.name }</h2></div>
                            <div className={style.attackPokemon}><h6>Attack {props.attack}</h6></div>
                        </div>
                        <img className={`${style.imagePokemon} ${style[`${props.types[0]}ImagePokemon`]}`} src={ props.image } alt={ props.name } />
                        <div className={style.idPokemon}><h3>N° {props.id}</h3></div>
                        <div className={style.typesContainer}>
                            {
                                props.types.map((type, index) => {
                                    return (
                                        <div key={index} className={`${style.typesPokemon} ${style[`${type}TypesPokemon`]}`}><h3>{ type }</h3></div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}


export default Card;