import { useState, useContext } from 'react';
import style from './Auth.module.css';

import { ReactComponent as LoginIcon } from './img/login.svg';
import { Text } from 'UI/Text';

import { urlAuth } from 'api/auth';
import { authContext } from 'context/authContext';
import { useDispatch } from 'react-redux';
import { deleteToken } from 'store';

export const Auth = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const { auth, clearAuth } = useContext(authContext);

  const getOut = () => {
    setShowLogout(!showLogout);
  };

  const logout = () => {
    dispatch(deleteToken());
    clearAuth();
    location.href = '/';
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn} onClick={getOut}>
            <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} className={style.img} />
          </button>
          {showLogout && (
            <button className={style.logout} onClick={logout}>
              Выйти
            </button>
          )}
        </>
      ) : (
        <Text As="a" href={urlAuth} className={style.authLink}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};
