import style from './Auth.module.css';
import PropTypes from 'prop-types';

export const Auth = ({ auth }) => (
  <button className={style.button}>
    {auth ? (
      auth
    ) : (
      <svg
        className={style.svg}
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M88 48a24 24 0 1 1-48 0 24 24 0 0 1 48 0Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M0 64a64 64 0 1 1 128 0A64 64 0 0 1 0 64ZM64 8a56 56 0 0 0-43.744 90.96C25.936 89.808 38.44 80 64 80s38.056 9.8 43.744 18.96a55.997 55.997 0 0 0-13.94-82.368A56 56 0 0 0 64 8Z"
        />
      </svg>
    )}
  </button>
);

Auth.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
