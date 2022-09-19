import style from './Post.module.css';

import PropTypes from 'prop-types';
import Image from './Image';
import Rating from './Rating';
import Time from './Time';
import DeleteBtn from './DeleteBtn';
import Content from './Content';

export const Post = ({ postData }) => {
  const { id, thumbnail, title, author, ups, created } = postData;

  return (
    <li className={style.post}>
      <Image thumbnail={thumbnail} title={title} />
      <Content id={id} title={title} author={author} />
      <Rating ups={ups} />
      <Time date={created} />
      <DeleteBtn />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
