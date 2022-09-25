import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Search.module.css';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { searchRequest } from 'store/search/searchAction';
import { useLocation, useNavigate } from 'react-router-dom';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const token = useSelector(state => state.tokenReducer.token);
  const navigation = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  useEffect(() => {
    // Сбрасываем строку поиска всех страницах кроме search
    !isSearchPage && setSearch('');
  }, [isSearchPage]);

  const handlerSubmit = event => {
    event.preventDefault();
    if (!token) return;
    dispatch(searchRequest(search));
    navigation('/search');
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
