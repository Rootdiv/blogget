import { useState } from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';

import { ReactComponent as LoginIcon } from './img/login.svg';
import { Text } from 'UI/Text';

import { urlAuth } from 'api/auth';
import { useAuth } from 'hooks/useAuth';

export const Auth = ({ token, delToken }) => {
  const auth = useAuth(token);
  const [logout, setLogout] = useState(false);

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
