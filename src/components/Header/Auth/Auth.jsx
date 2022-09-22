import { useState, useEffect } from 'react';
import style from './Auth.module.css';

import { ReactComponent as LoginIcon } from './img/login.svg';
import { Text } from 'UI/Text';
import { urlAuth } from 'api/auth';
import { useAuth } from 'hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from 'store/tokenReducer';
import Preloader from 'UI/Preloader';
import Notify from './Notify';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const [auth, loading, clearAuth, error] = useAuth();
  const page = useSelector(state => state.posts.page);
  const navigation = useNavigate();

  useEffect(() => {
    page ? navigation(`/category/${page}`) : navigation('/');
  }, [page]);

  const getOut = () => {
    setShowLogout(!showLogout);
  };

  const logout = () => {
    dispatch(deleteToken());
    clearAuth();
    navigation('/');
  };

  return (
    <div className={style.container}>
      {error && <Notify />}
      {(loading && !error) ? (
        <Preloader color={'#cc6633'} size={40} />
      ) : auth.name ? (
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
