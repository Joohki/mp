import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import classes from "./AuthForm.module.css";
import Notification from "../ui/Notification";
import { useDispatch } from "react-redux";
import {userActions} from '../../redux/reducer/user'

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
          dispatch(userActions.login({
            email: enteredEmail
          }))
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
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Password check</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordCheckInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
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
