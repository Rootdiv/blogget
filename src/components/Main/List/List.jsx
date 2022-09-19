import { useBestPosts } from 'hooks/useBestPost';
import Preloader from 'UI/Preloader';
import { Text } from 'UI/Text';
import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const [posts, loading] = useBestPosts();

  return (
    <ul className={style.list}>
      {loading ? <Preloader color='#56AF27' size={250} /> : posts.length ? (
        posts.map(({ data: postData }) => (<Post key={postData.id} postData={postData} />))
      ) : (
        <Text>Вы не авторизованы или Постов не найдено</Text>
      )}
    </ul>
  );
};
