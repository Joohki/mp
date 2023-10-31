import classes from "./PostForm.module.css";
import { useRef, useState } from "react";

export const CATEGORIES = ["E&E Tech", "A&K 글로벌", "헤도네", "신창이앤씨"];
// const [category, setCategory] = useState();
const isEmpty = (value) => {
  return value.trim().length === 0;
};
const isOverTwentyChar = (value) => {
  return value.trim().length > 20;
};
async function sendNoticeFormData(details) {
  const response = await fetch('/api/noticeboard', {
    method: 'POST',
    body: JSON.stringify(details),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

const PostForm = (props) => {
  const [validSubmitForm, setValidSubmitForm] = useState({
    name: true,
    email: true,
    title: true,
    category: true,
    contents: true,
  });
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const titleInputRef = useRef();
  const categoryInputRef = useRef();
  const summaryInputRef = useRef();
  const contentsInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredSummary= summaryInputRef.current.value;
    const enteredContents = contentsInputRef.current.value;

    const isValidName = !isEmpty(enteredName);
    const isValidEmail = !isEmpty(enteredEmail);
    const isValidTitle = !isEmpty(enteredEmail);
    const isValidCategory = !isEmpty(enteredEmail);
    

    setValidSubmitForm({
      name: isValidName,
      email: isValidEmail,
      title: isValidTitle,
      category: isValidCategory,
      
    });

    const isValidForm = isValidName && isValidEmail && isValidTitle && isValidCategory;

    if (!isValidForm) {
      return;
    }
    sendNoticeFormData({
      name: enteredName,
      email: enteredEmail,
      title: enteredTitle,
      category: enteredCategory,
      summary: enteredSummary,
      contents: enteredContents,
      createdAt: new Date()?.toLocaleDateString("ko", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
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
        <input type="text" name="title" id="title" ref={titleInputRef} required />
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="category">카테고리</label>
        <select name="category" id="category" ref={categoryInputRef}>
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
        <input type="text" name="summary" id="summary" ref={summaryInputRef} required />
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" ref={contentsInputRef} required />
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
export default PostForm;
