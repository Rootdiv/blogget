import style from './List.module.css';
import { useEffect, useRef, useState } from 'react';
import Post from './Post';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequest } from 'store/posts/postsAction';
import { useParams, Outlet } from 'react-router-dom';
import { postsSlice } from 'store/posts/postsSlice';

export const List = () => {
  const token = useSelector(state => state.tokenReducer.token);
  // Получем loading для показа прелодаера
  const loading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.posts);
  // Получем isLast отключения прелодаера
  const isLast = useSelector(state => state.posts.isLast);
  const counter = useSelector(state => state.posts.counter);
  const [showButton, setShowButton] = useState(false);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(postsRequest(token));
    dispatch(postsSlice.actions.changePage(page));
    setShowButton(false);
    if (token) {
      // dispatch(postsRequestAsync(page));
    }
  }, [page]);

  useEffect(() => {
    if (counter > 2) {
      !isLast && setShowButton(true);
      return;
    }
    if (!posts.length && isLast) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && token) {
        // dispatch(postsRequestAsync());
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
    // dispatch(postsRequestAsync());
    setShowButton(false);
  };

  return (
    <>
      <ul className={style.list}>
        {posts.map(({ data: postData }) => (<Post key={postData.id} postData={postData} />))}
        <li ref={endList} className={style.end} />
        {(!isLast && (loading || posts.length > 0)) && <Preloader color='#56af27' size={250} />}
      </ul>
      {(!isLast && showButton) && <button className={style.btn} onClick={moreLoad}>Загрузить ещё</button>}
      <Outlet />
    </>
  );
};
