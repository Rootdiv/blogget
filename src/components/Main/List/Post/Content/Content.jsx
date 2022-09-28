import style from './Content.module.css';
import PropTypes from 'prop-types';
import { Text } from 'UI/Text';
import { Link } from 'react-router-dom';

export const Content = ({ id, title, author }) => (
  <div className={style.content}>
    <Text As="h2" bold className={style.title}>
      <Link className={style.linkPost} to={`/post/${id}`}>
        <Text bold size={26} tsize={32}>{title}</Text>
      </Link>
    </Text>
    <Text As="a" size={12} tsize={14} medium color="orange" className={style.linkAuthor} href="#author">
      {author}
    </Text>
  </div>
);

Content.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
