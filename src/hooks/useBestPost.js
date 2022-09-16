import { useState, useEffect } from 'react';
import { URL_API } from 'api/const';
import { useSelector } from 'react-redux';

export const useBestPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({ data }) => {
        const postsData = data.children;
        setPosts(postsData);
      })
      .catch(err => {
        console.error('Произошла ошибка: ', err);
      });
  }, [token]);

  return [posts];
};
