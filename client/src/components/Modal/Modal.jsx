import React from 'react';
import style from './Modal.module.css';

const Modal = ({ title, message, modal, setModal}) => {
  return (
    <>
        {
            modal &&
                <div className={style.overlay}>
                    <div className={style.modalContainer}>
                        <div className={style.modalTitle}>
                            <h3>Message!</h3>
                        </div>
                        <button className={style.xCloseModal} onClick={() => setModal(false)}>X</button>
                        <div className={style.infoContainer}>
                            <h1>{title}</h1>
                            <p>{message}</p>
                            <button onClick={() => setModal(false)}>OK!</button>
                        </div>
                    </div>
                </div>
        }
    </>
  );
}

export default Modal;