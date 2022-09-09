import style from './Post.module.css';

import PropTypes from 'prop-types';
import Image from './Image';
import Rating from './Rating';
import Time from './Time';
import DeleteBtn from './DeleteBtn';
import Content from './Content';

export const Post = ({ postData }) => {
  const { title, author, ups, date } = postData;

  return (
    <ul className={style.post}>
      <Image title={title} />
      <Content title={title} author={author} />
      <Rating ups={ups} />
      <Time date={date} />
      <DeleteBtn />
    </ul>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
