import style from './List.module.css';
import { useEffect, useRef } from 'react';
import { useBestPosts } from 'hooks/useBestPost';
import Post from './Post';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from 'store/posts/postsAction';
import { useParams, Outlet } from 'react-router-dom';

export const List = () => {
  // Получем loading для показа прелодаера
  const [, loading] = useBestPosts();
  const posts = useSelector(state => state.posts.posts);
  // Получем isLast отключения прелодаера
  const isLast = useSelector(state => state.posts.isLast);
  const counter = useSelector(state => state.posts.counter);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    if (counter > 2) return;
    if (!posts.length && !loading && isLast) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
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
    dispatch(postsRequestAsync());
  };

  return (
    <>
      <ul className={style.list}>
        {posts.map(({ data: postData }) => (<Post key={postData.id} postData={postData} />))}
        <li ref={endList} className={style.end} />
        {!isLast && (loading || posts.length > 0) && <Preloader color='#56af27' size={250} />}
      </ul>
      {(!isLast && counter > 2) && <button className={style.btn} onClick={moreLoad}>Загрузить ещё</button>}
      <Outlet />
    </>
  );
};
