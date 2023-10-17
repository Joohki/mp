import classes from "./noticeform.module.css";
import { useRef, useState } from "react";

const CATEGORIES = ["E&E Tech", "A&K 글로벌", "헤도네", "신창이앤씨"];
// const [category, setCategory] = useState();
const isEmpty = (value) => {
  return value.trim().length === 0;
};
const isFiveChar = (value) => {
  return value.trim().length === 5;
};
const NoticeForm = (props) => {
  const [validSubmitForm, setValidSubmitForm] = useState({
    name: true,
    email: true,
    contents: true,
  });
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const contentsInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredContents = contentsInputRef.current.value;

    const isValidName = !isEmpty(enteredName);
    const isValidEmail = !isEmpty(enteredEmail);
    const isValidContents = isFiveChar(enteredContents);

    setValidSubmitForm({
      name: isValidName,
      email: isValidEmail,
      contents: isValidContents,
    });

    const isValidForm = isValidName && isValidEmail && isValidContents;

    if (!isValidForm) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      contents: enteredContents,
    });
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!validSubmitForm.name && <p>please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.email ? "" : classes.invalid
        }`}
      >
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" ref={emailInputRef}></input>
        {!validSubmitForm.email && <p>please enter a valid email</p>}
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="category">카테고리</label>
        <select name="category" id="category">
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="summary">요약</label>
        <input type="text" name="summary" id="summary" required />
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" required />
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default NoticeForm;
