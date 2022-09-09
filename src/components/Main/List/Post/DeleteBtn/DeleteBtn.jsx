import style from './DeleteBtn.module.css';

export const DeleteBtn = () => (
  <button className={style.delete}>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        // eslint-disable-next-line max-len
        d="M8.438 4.313H8.25a.188.188 0 0 0 .188-.188v.188h7.124v-.188c0 .103.085.188.188.188h-.188V6h1.688V4.125c0-.827-.673-1.5-1.5-1.5h-7.5c-.827 0-1.5.673-1.5 1.5V6h1.688V4.312ZM20.25 6H3.75a.75.75 0 0 0-.75.75v.75c0 .103.084.188.188.188h1.415l.579 12.257c.038.8.698 1.43 1.498 1.43h10.64c.802 0 1.46-.628 1.498-1.43l.579-12.258h1.416A.188.188 0 0 0 21 7.5v-.75a.75.75 0 0 0-.75-.75Zm-3.11 13.688H6.86l-.567-12h11.414l-.567 12Z"
        fill="currentColor"
      />
    </svg>
  </button>
);
