import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Search.module.css';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { searchRequest } from 'store/search/searchAction';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const token = useSelector(state => state.tokenReducer.token);

  const handlerSubmit = event => {
    event.preventDefault();
    if (!token) return;
    dispatch(searchRequest(search));
  };
  const handlerSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input type="search" className={style.search} onChange={handlerSearch} value={search} />
      <button className={style.button} type="submit">
        <SearchIcon className={style.svg} />
      </button>
    </form>
  );
};
