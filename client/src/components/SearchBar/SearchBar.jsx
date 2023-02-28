import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { getNamePokemon } from "../../redux/actions";
import Modal from '../../components/Modal/Modal';
import style from './SearchBar.module.css'


const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [messageError, setMessegeError] = useState({
        title: '',
        message: ''
    });
   
    const inputHandler = (event) => {
        setName(event.target.value);
    }

    const buttonHandler = () => {
        (dispatch(getNamePokemon(name)))
        .then(res => res)
        .catch(err => {
            setMessegeError({
                title: 'Pokemon not found',
                message: err.response.data.error
            });
            setModal(true);
        });

        setName('');
    }

    return (
        <>
            <div className={style.bar}>
                <input className={style.barInput} type='search' value={name} onChange={inputHandler} placeholder='Enter a pokemon name...' />
                <button className={style.btnSearch} onClick={buttonHandler}>Search</button>
            </div>

            <Modal 
                title={messageError.title} 
                message={messageError.message}
                modal={modal}
                setModal={setModal}
            />
        </>
    );
}


export default SearchBar;