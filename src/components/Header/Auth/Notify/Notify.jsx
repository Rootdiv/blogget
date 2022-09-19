import { useState } from 'react';
import ReactDOM from 'react-dom';

import style from './Notify.module.css';

export const Notify = () => {
  const [show, setShow] = useState(true);

  const hide = () => {
    setShow(false);
  };
  return ReactDOM.createPortal(
    show && <div className={style.notify} onClick={hide}>
      Произошла ошибка авторизации.
    </div>,
    document.getElementById('notify-root')
  );
};
