import { useState } from 'react';
import style from './Content.module.css';
import PropTypes from 'prop-types';
import { Text } from 'UI/Text';
import Modal from 'components/Modal';

export const Content = ({ id, title, author }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={style.content}>
      <Text As="h2" bold className={style.title}>
        <Text
          As="a"
          bold
          size={26}
          tsize={32}
          className={style.linkPost}
          href="#post"
          onClick={() => {
            setIsModalOpen(true);
          }}>
          {title}
        </Text>
      </Text>
      <Text As="a" size={12} tsize={14} medium color="orange" className={style.linkAuthor} href="#author">
        {author}
      </Text>
      {isModalOpen && (
        <Modal
          id={id}
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

Content.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
