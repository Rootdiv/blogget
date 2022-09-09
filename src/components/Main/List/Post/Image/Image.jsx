import style from './Image.module.css';
import PropTypes from 'prop-types';

import notphoto from './img/notphoto.jpg';

export const Image = ({ title }) => <img src={notphoto} alt={title} className={style.img} />;

Image.propTypes = {
  title: PropTypes.string,
};
