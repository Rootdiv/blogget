import style from './Modal.module.css';
import { ReactComponent as CloseIcon } from './img/close.svg';

import ReactDOM from 'react-dom';
import Markdown from 'markdown-to-jsx';
import { useEffect, useRef } from 'react';
import { useCommentsData } from 'hooks/useCommentsData';
import { Text } from 'UI/Text';
import FormComment from './FormComment';
import Comments from './Comments';
import Preloader from 'UI/Preloader';
import { useNavigate, useParams } from 'react-router-dom';

export const Modal = () => {
  const { id, page } = useParams();
  const navigation = useNavigate();
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const [post, comments, status] = useCommentsData(id);

  const handleClick = event => {
    const target = event.target;
    if (target === overlayRef.current) {
      navigation(`/category/${page}`);
    } else if (target.closest(`.${style.close}`) === closeRef.current) {
      navigation(`/category/${page}`);
    }
  };

  const handleKeyClose = event => {
    if (event.key === 'Escape') {
      navigation(`/category/${page}`);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', handleKeyClose);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keyup', handleKeyClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (
          <Preloader color={'#cc6633'} size={150} />
        )}
        {status === 'error' && (
          <Text As="p" medium dsize={18}>
            Произошла ошибка загрузки поста.
          </Text>
        )}
        {status === 'loaded' && (
          <>
            <Text As="h2" className={style.title} size={22} tsize={24}>
              {post.title}
            </Text>
            <div className={style.content}>
              <Markdown options={{ overrides: { a: { props: { target: '_blank' } } } }}>{post.selftext}</Markdown>
            </div>
            <Text As="p" tsize={16} className={style.author}>
              {post.author}
            </Text>
            <FormComment />
            <Comments comments={comments} />
          </>
        )}
        <button className={style.close} ref={closeRef}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};
