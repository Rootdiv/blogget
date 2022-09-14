import style from './Comments.module.css';
import PropTypes from 'prop-types';
import Time from 'components/Main/List/Post/Time';
import { Text } from 'UI/Text';
import formatDate from 'utils/formatDate';

export const Comments = ({ comments }) => (
  <ul className={style.list}>
    {comments.length ? (
      comments.map(({ id, author, body, created: date }) => {
        if (body) {
          // Если комментариев много, то выводим только те где есть текст.
          return (
            <li key={id} className={style.item}>
              <Text As="h3" className={style.author} size={18} tsize={22}>
                {author}
              </Text>
              <Text As="p" className={style.comment} size={14} tsize={18}>
                {body}
              </Text>
              <Time date={date.length ? formatDate(date) : date} />
            </li>
          );
        }
      })
    ) : (
      <Text As="p">Нет комментариев</Text>
    )}
  </ul>
);

Comments.propTypes = {
  comments: PropTypes.array,
};
