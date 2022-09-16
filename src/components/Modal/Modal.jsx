import style from './Modal.module.css';
import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from './img/close.svg';

import ReactDOM from 'react-dom';
import Markdown from 'markdown-to-jsx';
import { useEffect, useRef } from 'react';
import { useCommentsData } from 'hooks/useCommentsData';
import { Text } from 'UI/Text';
import FormComment from './FormComment';
import Comments from './Comments';

export const Modal = ({ id, closeModal }) => {
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const [commentsData] = useCommentsData(id);
  const [post, comments] = commentsData;

  const handleClick = event => {
    const target = event.target;
    if (target === overlayRef.current) {
      closeModal();
    } else if (target.closest(`.${style.close}`) === closeRef.current) {
      closeModal();
    }
  };

  const handleKeyClose = event => {
    if (event.key === 'Escape') {
      closeModal();
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
        {post ? (
          <>
            <Text As="h2" tsize={24} className={style.title}>
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
        ) : (
          <Text As="p" bold dsize={18}>
            Загрузка...
          </Text>
        )}
        <button className={style.close} ref={closeRef}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
