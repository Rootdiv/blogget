import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogout, authRequestAsync } from 'store/auth/authAction';

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data);
  const token = useSelector(state => state.tokenReducer.token);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const clearAuth = () => dispatch(authLogout());
  return [auth, loading, clearAuth, error];
};
