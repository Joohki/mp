import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useRouter } from "next/router";
import classes from "./AuthForm.module.css";
import Notification from "../ui/Notification";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducer/user";
import Link from "next/link";
async function CreateUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something Went Wrong");
  }
  return data;
}
function AuthForm() {
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordCheckInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function submitHandler(event) {
    event.preventDefault();
    setRequestStatus("pending");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        if (!result.error) {
          router.replace("/profile");
          setRequestStatus("success");
          dispatch(
            userActions.login({
              email: enteredEmail,
            })
          );
          return;
        }
        setRequestError(result.error);
        setRequestStatus("error");
      } else {
        const enteredPasswordCheck = passwordCheckInputRef.current.value;

        if (enteredPassword === enteredPasswordCheck) {
          await CreateUser(enteredEmail, enteredPassword);

          setRequestStatus("success");
        } else {
          setRequestStatus("error");
          throw new Error("check you password");
        }
      }
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }
  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "로그인" : "회원가입"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordCheckInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "로그인" : "계정생성"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "계정생성" : "로그인"}
          </button>
        </div>
      </form>
      {isLogin && (
        <div className={classes.flexContainer}>
          <div className={classes.container}>
            <div className={classes.subtitle}>SNS 계정으로 로그인해주세요</div>
            <p className={classes.paragraph}>
              계정이 없다면 자동으로 회원가입이 진행됩니다.
            </p>
          </div>
          <div className={classes.buttonContainer}>
            <div className={classes.google} onClick={() => signIn("google")}>
              <AiOutlineGoogle className="w-6 h-6" />
              Sign in with Google
            </div>
            <div className={classes.naver} onClick={() => signIn("naver")}>
              <SiNaver className="w-4 h-4" />
              Sign in with Naver
            </div>
            <div
              className={classes.kakao}
              onClick={() => signIn("kakao", { callbackUrl: "/" })}
            >
              <RiKakaoTalkFill className="w-6 h-6" />
              Sign in with Kakao
            </div>
          </div>
        </div>
      )}

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default AuthForm;
