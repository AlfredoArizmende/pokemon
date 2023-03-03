import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { validate } from './validation';
import { getAllTypes, getAllPokemons } from '../../redux/actions';
import Modal from '../../components/Modal/Modal';
import style from './Form.module.css';


const Form = ({ setLoading }) => {
    const dispatch = useDispatch();
    const { types } = useSelector(state => state);

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState({
        title: '',
        message: ''
    });

    const [pokemonData, setPokemonData] = useState({
        name: '', 
        image: '',
        hp: '0', 
        attack: '0', 
        defense: '0', 
        speed: '0', 
        height: '0', 
        weight: '0',
        types: []
    });

    const [errors, setErrors] = useState({
        name: '', 
        image: '',
        hp: '', 
        attack: '', 
        defense: '', 
        speed: '', 
        height: '', 
        weight: '',
        types: ''
    });

    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    const changeInputsHandler = (event) => {
        setPokemonData({
            ...pokemonData,
            [event.target.name]: event.target.value
        });

        setErrors(validate({
            ...pokemonData,
            [event.target.name]: event.target.value
        }));
    }

    const changeTypesHandler = (event) => {
        setPokemonData({
            ...pokemonData,
            types: pokemonData.types.includes(event.target.value)
                   ? pokemonData.types.filter(type => type !== event.target.value)
                   : [...pokemonData.types, event.target.value]
        });

        setErrors(validate({
            ...pokemonData,
            types: pokemonData.types.includes(event.target.value)
                   ? pokemonData.types.filter(type => type !== event.target.value)
                   : [...pokemonData.types, event.target.value]
        }));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/pokemons', pokemonData)
        .then(res => {
            setLoading(false);
            dispatch(getAllPokemons())
                .then(res => setLoading(true))
                .catch(error => error);

            setMessage({
                title: 'Pokemon created',
                message: res.data
            });

            setModal(true);
        })
        .catch(err => {
            setMessage({
                title: 'Failed to create',
                message: err.response.data.error
            });

            setModal(true);
        });

        setPokemonData({
            name: '', 
            image: '',
            hp: '0', 
            attack: '0', 
            defense: '0', 
            speed: '0', 
            height: '0', 
            weight: '0',
            types: []
        });
    }

    return (
        <div className={style.container}>
            <div className={style.boxPokemon}>
                <div className={style.boxImage}>
                    <h1>create your own pokemon</h1>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png" alt="charizard" />
                </div>

                <div className={style.boxForm}>
                    
                    <form onSubmit={submitHandler}>
                        <div className={style.boxPokemon}>
                            <div className={style.inputBox}>
                                <input type="text" name="name" value={pokemonData.name} onChange={changeInputsHandler} autoComplete="off" placeholder='Enter a name...' />
                                { errors.name && <p className={style.errorMessage}>{errors.name}</p> }
                            </div>

                            <div className={style.inputBox}>
                                <input type="text" name="image" value={pokemonData.image} onChange={changeInputsHandler} autoComplete="off" placeholder='Copy an image link...' />
                                { errors.image && <p className={style.errorMessage}>{errors.image}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="hp">HP</label>
                                    <input type="range" name="hp" min='0' max='200' step='1' value={pokemonData.hp} onChange={changeInputsHandler} />
                                    <span>{pokemonData.hp}</span>
                                </div>
                                { errors.hp && <p className={style.errorMessage}>{errors.hp}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="attack">Attack</label>
                                    <input type="range" name="attack" min='0' max='200' step="1" value={pokemonData.attack} onChange={changeInputsHandler} />
                                    <span>{pokemonData.attack}</span>
                                </div>
                                { errors.attack && <p className={style.errorMessage}>{errors.attack}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="defense">Defense</label>
                                    <input type="range" name="defense" min='0' max='200' step="1" value={pokemonData.defense} onChange={changeInputsHandler} />
                                    <span>{pokemonData.defense}</span>
                                </div>
                                { errors.defense && <p className={style.errorMessage}>{errors.defense}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="speed">Speed</label>
                                    <input type="range" name="speed" min='0' max='200' step="1" value={pokemonData.speed} onChange={changeInputsHandler} />
                                    <span>{pokemonData.speed}</span>
                                </div>
                                { errors.speed && <p className={style.errorMessage}>{errors.speed}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="height">Height</label>
                                    <input type="range" name="height" min='0' max='200' step="1" value={pokemonData.height} onChange={changeInputsHandler} />
                                    <span>{pokemonData.height}</span>
                                </div>
                                { errors.height && <p className={style.errorMessage}>{errors.height}</p> }
                            </div>

                            <div className={style.inputBoxRange}>
                                <div className={style.rangeBox}>
                                    <label htmlFor="weight">Weight</label>
                                    <input type="range" name="weight" min='0' max='200' step="1" value={pokemonData.weight} onChange={changeInputsHandler} />
                                    <span>{pokemonData.weight}</span>
                                </div>
                                { errors.weight && <p className={style.errorMessage}>{errors.weight}</p> }
                            </div>
                        </div>

                        <div className={style.boxSelectTypes}>
                            <div className={style.selectContainer}>
                                <select className={style.selectBox} onChange={changeTypesHandler}>
                                    <option selected disabled>Choose 1 or more types</option>
                                    {
                                        types.map(type => {
                                            return (
                                                <option key={type.id} value={type.name}>{type.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                { errors.types && <p className={style.errorMessage}>{errors.types}</p> }
                            </div>
                        </div>

                        {
                            errors.name || errors.image || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.types || !pokemonData.name || !pokemonData.image 
                            ? <button className={style.btnCreateDis} type="submit" disabled>Create Pokemon</button>
                            : <button className={style.btnCreate} type="submit">Create Pokemon</button>
                        }
                    </form>
                </div>
            </div>
            <Modal 
                title={message.title} 
                message={message.message}
                modal={modal}
                setModal={setModal}
            />
        </div>
    );
}


export default Form;