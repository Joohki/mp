import classes from "./PostForm.module.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { IPostFormData, IPostFormProps } from "@/types";
import { RootState } from "@/redux/store";

export const CATEGORIES: string[] = [
  "E&E Tech",
  "A&K 글로벌",
  "헤도네",
  "신창이앤씨",
];

const isEmpty = (value: string) => {
  return value.trim().length === 0;
};
const isOverTwentyChar = (value: string) => {
  return value.trim().length > 20;
};
async function postNoticeFormData(details: IPostFormData): Promise<void> {
  const response = await fetch("/api/noticeboard", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}
async function patchNoticeFormData(details: IPostFormData): Promise<void> {
  const response = await fetch("/api/noticeboard", {
    method: "PATCH",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}
const onCancel = () => {};

const PostForm = (props: IPostFormProps) => {
  const router = useRouter();
  const userEmail = useSelector((state: RootState) => state.user.email);
  const isEditMode = props.post.isEditMode; // 수정 모드인지 확인

  const [file, setFile] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [validSubmitForm, setValidSubmitForm] = useState({
    name: true,
    email: true,
    title: true,
    category: true,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const summaryInputRef = useRef<HTMLInputElement>(null);
  const contentsInputRef = useRef<HTMLTextAreaElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          setFilename(file.name);
          toast.success("파일을 성공적으로 업로드했습니다.");
        });
      }
    );
  };
  const confirmHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (
        nameInputRef.current &&
        emailInputRef.current &&
        titleInputRef.current &&
        categoryInputRef.current &&
        summaryInputRef.current &&
        contentsInputRef.current
      ) {
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredTitle = titleInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        const enteredSummary = summaryInputRef.current.value;
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

        const isValidForm: boolean =
          isValidName && isValidEmail && isValidTitle && isValidCategory;

        if (!isValidForm) {
          return;
        }
        if (isEditMode) {
          await patchNoticeFormData({
            _id: props.post._id,
            name: enteredName,
            email: enteredEmail,
            title: enteredTitle,
            category: enteredCategory,
            summary: enteredSummary,
            contents: enteredContents,
            date: new Date(),
            modifiedAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            file: file,
            filename: filename,
          });
        } else {
          await postNoticeFormData({
            name: enteredName,
            email: enteredEmail,
            title: enteredTitle,
            category: enteredCategory,
            summary: enteredSummary,
            contents: enteredContents,
            date: new Date(),
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            file: file,
            filename: filename,
          });
        }
        toast.success("게시글을 성공적으로 처리했습니다.");
        router.replace("/notice-board");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
        <input
          type="text"
          id="email"
          ref={emailInputRef}
          value={userEmail ? userEmail : null}
        ></input>
        {!validSubmitForm.email && <p>please enter a valid email</p>}
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={titleInputRef}
          required
        />
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
        <label htmlFor="file">파일</label>
        {uploadProgress === 0 ? null : (
          <div className={classes.progress}>
            <div
              className={classes["progress-bar"]}
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress < 100
                ? `Uploading... ${uploadProgress}`
                : `Upload Complete ${uploadProgress}%`}
            </div>
          </div>
        )}
        <input
          className={classes.file}
          type="file"
          placeholder="파일"
          name="file"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <div
        className={`${classes.control} ${
          validSubmitForm.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          ref={summaryInputRef}
          required
        />
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default PostForm;
