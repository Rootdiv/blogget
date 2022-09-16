import style from './FormComment.module.css';
import { useState, useContext, useRef, useEffect } from 'react';
import { authContext } from 'context/authContext';
import { Text } from 'UI/Text';

export const FormComment = () => {
  const [showForm, setShowForm] = useState(false);
  const { auth } = useContext(authContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (showForm) {
      textareaRef.current.focus();
    }
  }, [showForm]);

  const handleClick = () => {
    setShowForm(true);
  };

  const commentSubmit = event => {
    event.preventDefault();
    console.log(textareaRef.current.value);
  };

  return showForm ? (
    <form className={style.form} onSubmit={commentSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea className={style.textarea} ref={textareaRef}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  ) : (
    <button className={style.btn} onClick={handleClick}>
      Написать комментарий
    </button>
  );
};
