import style from './FormComment.module.css';
import { useContext, useRef } from 'react';
import { authContext } from 'context/authContext';
import { Text } from 'UI/Text';

export const FormComment = () => {
  const { auth } = useContext(authContext);
  const textareaRef = useRef(null);
  const commentSubmit = event => {
    event.preventDefault();
    console.log(textareaRef.current.value);
  };
  return (
    <form className={style.form} onSubmit={commentSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea className={style.textarea} ref={textareaRef}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
