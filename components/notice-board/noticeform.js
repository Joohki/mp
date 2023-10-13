import classes from "./noticeform.module.css";
import { useRef, useState } from "react";

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
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!validSubmitForm.name && <p>please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.email ? "" : classes.invalid
        }`}
      >
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef}></input>
        {!validSubmitForm.email && <p>please enter a valid email</p>}
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.contents ? "" : classes.invalid
        }`}
      >
        <label htmlFor="contents">Contents</label>
        <input type="text" id="contents" ref={contentsInputRef}></input>
        {!validSubmitForm.contents && <p>please enter a valid contents</p>}
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
