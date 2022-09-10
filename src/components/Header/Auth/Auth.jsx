import { useState, useEffect } from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';

import { ReactComponent as LoginIcon } from './img/login.svg';
import { Text } from 'UI/Text';
import { URL_API } from 'api/const';
import { urlAuth } from 'api/auth';

export const Auth = ({ token, delToken }) => {
  const [auth, setAuth] = useState({});
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    if (!token) return;
    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({ name, img });
      })
      .catch(err => {
        console.error('Произошла ошибка: ', err);
        setAuth({});
        delToken();
      });
  }, [token]);

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn} onClick={() => setLogout(!logout)}>
            <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} className={style.img} />
          </button>
          {logout && (
            <button className={style.logout} onClick={() => delToken()}>
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

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
