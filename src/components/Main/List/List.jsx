import style from './List.module.css';
import { useEffect, useRef, useState } from 'react';
import Post from './Post';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequest } from 'store/posts/postsAction';
import { useParams, Outlet } from 'react-router-dom';
import { postsSlice } from 'store/posts/postsSlice';
import { Text } from 'UI/Text';
import { searchRequest, searchRequestReset } from 'store/search/searchAction';

export const List = () => {
  const { page } = useParams();
  const type = page ? 'posts' : 'search';
  const token = useSelector(state => state.tokenReducer.token);
  // Получем loading для показа прелодаера
  const loading = useSelector(state => state[type].loading);
  const posts = useSelector(state => state[type].posts);
  // Получем isLast отключения прелодаера
  const isLast = useSelector(state => state[type].isLast);
  let counter = useSelector(state => state.search.counter);
  const search = useSelector(state => state.search.search);
  const after = useSelector(state => state.search.after);
  const [showButton, setShowButton] = useState(false);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(postsSlice.actions.changePage(page));
    if (page) {
      dispatch(searchRequestReset());
      dispatch(postsRequest(page));
    }
    setShowButton(false);
  }, [page]);

  useEffect(() => {
    if (counter > 2) {
      !isLast && setShowButton(true);
      return;
    }
    if (!posts.length && isLast) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && token) {
        if (page) {
          dispatch(postsRequest());
        } else {
          ++counter;
          dispatch(searchRequest(search, after, counter));
        }
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, counter]);

  const moreLoad = () => {
    if (page) {
      dispatch(postsRequest());
    } else {
      ++counter;
      dispatch(searchRequest(search, after, counter));
    }
    setShowButton(false);
  };

  return (
    <>
      {!page && <Text As='h1' className={style.search} size={22} tsize={26}>
        Результаты поиска по запросу &quot;{search}&quot;:
      </Text>}
      <ul className={style.list}>
        {!page && (counter === 0) && loading && <li className={style.end}>
          {/* Показываем этот прелодаер на странице поиска при первом запросе или изменение старого */}
          <Preloader color='#56af27' size={250} />
        </li>}
        {posts.map(({ data: postData }) => (<Post key={postData.id} postData={postData} />))}
        <li ref={endList} className={style.end} />
        {(page || (counter > 0)) && !isLast && loading && <Preloader color='#56af27' size={250} />}
      </ul>
      {(!isLast && showButton) && <button className={style.btn} onClick={moreLoad}>Загрузить ещё</button>}
      <Outlet />
    </>
  );
};
