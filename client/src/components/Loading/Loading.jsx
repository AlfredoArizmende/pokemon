import React from 'react';
import style from './Loading.module.css';

const Loading = () => {
  return (
    <div className={style.container}>
        <img className={style.loading} src="https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif" alt="loading" />
    </div>
  );
}

export default Loading;