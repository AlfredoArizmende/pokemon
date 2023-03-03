import React from "react";
import style from './Pagination.module.css';


const Pagination = ({ pokemonsPerPage, pokemonsLength, setCurrentPage, currentPage, minPageNumberLimit, maxPageNumberLimit, setMinPageNumberLimit, setMaxPageNumberLimit, pageNumberLimit }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(pokemonsLength / pokemonsPerPage); i++) {
        pages.push(i);
    }

    const btnPrevtHandler = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const btnNextHandler = () => {
        setCurrentPage(currentPage + 1);
        
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    return (
        <div className={style.pagination}>
            <button className={currentPage === 1 ? style.btnPrevNextDisable : style.btnPrevNext} onClick={btnPrevtHandler} disabled={currentPage === 1 ? true : false}>Prev</button>

            {
                pages &&
                pages.map((page, index) => {
                    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={page === currentPage ? style.active : style.btnPagination}>
                                {page}
                            </button>
                        );
                    } else {
                        return null;
                    }
                })
            }

            <button className={currentPage === Math.ceil(pokemonsLength / pokemonsPerPage) ? style.btnPrevNextDisable : style.btnPrevNext} onClick={btnNextHandler} disabled={currentPage === Math.ceil(pokemonsLength / pokemonsPerPage) ? true : false}>Next</button>
        </div>
    );
}


export default Pagination;