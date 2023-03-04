import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getDetailPokemon, cleanDetail } from '../../redux/actions';
import Loading from "../../components/Loading/Loading";
import style from './Detail.module.css';


const Detail = ({loading, setLoading}) => {
    const { idPokemon } = useParams();
    const dispatch = useDispatch();
    const { detailPokemon } = useSelector(state => state);
    
    useEffect(() => {
        setLoading(false);
        dispatch(getDetailPokemon(idPokemon))
        .then(() => setLoading(true))
        .catch(error => error);

        return () => dispatch(cleanDetail());
    }, [dispatch, idPokemon, setLoading]);

    return (
        <>
            {
                loading ?
                <div className={style.container}>
                    <div className={`${style.box} ${style[`${detailPokemon.types?.[0]}Box`]}`}>
                        <div className={style.imageBoxPokemon}>
                            <img className={style.logoPokemon} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="Logo Pokemon" />
                            <img className={style.imagePokemon} src={detailPokemon?.image} alt={detailPokemon?.name} />
                        </div>
                        <div className={style.infoPokemon}>
                            <h3>N° {!isNaN(detailPokemon?.id) ? '00' : ''}{detailPokemon?.id}</h3>
                            <h1>{detailPokemon.name?.toUpperCase()}</h1>
                            <div className={style.statsPokemon}>
                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                            {detailPokemon?.hp}
                                            <span>Hp</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                            {detailPokemon?.hp}
                                            <span>Attack</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                        {detailPokemon?.defense}
                                            <span>Defense</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                        {detailPokemon?.speed}
                                            <span>Speed</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                        {detailPokemon?.height}
                                            <span>Height</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.hpCircleWrap}>
                                    <div className={style.hpCircle}>
                                        <div className={`${style.mask} ${style.full1}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={`${style.mask} ${style.half}`}>
                                            <div className={style.fill1}></div>
                                        </div>
                                        <div className={style.numCircle}>
                                        {detailPokemon?.weight}
                                            <span>Weight</span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className={style.typesContainer}>
                            {
                                detailPokemon.types?.map((type, index) => {
                                    return (
                                        <div key={index} className={`${style.typesPokemon} ${style[`${type}TypesPokemon`]}`}><h3>{ type }</h3></div>
                                    )
                                })
                            }
                        </div>
                        </div>
                    </div>         
                </div>
                : <Loading />
            }
        </>
    );
}


export default Detail;