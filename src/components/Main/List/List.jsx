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
  const counter = useSelector(state => state[type].counter);
  const search = useSelector(state => state.search.search);
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
          dispatch(searchRequest(search));
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
      dispatch(searchRequest(search));
    }
    setShowButton(false);
  };

  return (
    <>
      {!page && <Text As='h1' className={style.search} size={22} tsize={26}>
        Результаты поиска по запросу &quot;{search}&quot;:
      </Text>}
      <ul className={style.list}>
        {posts.map(({ data: postData }) => (<Post key={postData.id} postData={postData} />))}
        <li ref={endList} className={style.end} />
        {(token && (!isLast && loading)) && <Preloader color='#56af27' size={250} />}
      </ul>
      {(!isLast && showButton) && <button className={style.btn} onClick={moreLoad}>Загрузить ещё</button>}
      <Outlet />
    </>
  );
};
