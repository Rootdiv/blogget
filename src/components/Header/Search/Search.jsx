import style from './Search.module.css';

export const Search = () => (
  <form className={style.form}>
    <input type="search" className={style.search} />
    <button className={style.button}>
      <svg
        className={style.svg}
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          // eslint-disable-next-line max-len
          d="M126.25 110.675 101.325 85.75a5.996 5.996 0 0 0-4.25-1.75H93c6.9-8.825 11-19.925 11-32 0-28.725-23.275-52-52-52S0 23.275 0 52s23.275 52 52 52c12.075 0 23.175-4.1 32-11v4.075c0 1.6.625 3.125 1.75 4.25l24.925 24.925c2.35 2.35 6.15 2.35 8.475 0l7.075-7.075a6.028 6.028 0 0 0 .025-8.5ZM52 84c-17.675 0-32-14.3-32-32 0-17.675 14.3-32 32-32 17.675 0 32 14.3 32 32 0 17.675-14.3 32-32 32Z"
          fill="#000"
        />
      </svg>
    </button>
  </form>
);
