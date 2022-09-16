import style from './FormComment.module.css';
import { useState, useContext, useRef, useEffect } from 'react';
import { authContext } from 'context/authContext';
import { Text } from 'UI/Text';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from 'store';

export const FormComment = () => {
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { auth } = useContext(authContext);
  const refTextarea = useRef(null);

  useEffect(() => {
    if (showForm) {
      refTextarea.current.focus();
    }
  }, [showForm]);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleChange = event => {
    dispatch(updateComment(event.target.value));
  };

  const commentSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  return showForm ? (
    <form className={style.form} onSubmit={commentSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea className={style.textarea} value={value} onChange={handleChange} ref={refTextarea}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  ) : (
    <button className={style.btn} onClick={handleClick}>
      Написать комментарий
    </button>
  );
};
