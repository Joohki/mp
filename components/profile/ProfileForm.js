import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import { persistor } from "../../redux/store";
import { useSession } from "next-auth/react";
function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordCheckRef = useRef();
  const { data: session, status } = useSession();
  async function submitHandler(event) {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    const enteredNewPasswordCheck = newPasswordCheckRef.current.value;
    await props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
      newPasswordCheck: enteredNewPasswordCheck,
    });
  }
  async function logoutHandler() {
    signOut();
    await persistor.purge();
  }
  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="profile-photo">프로필 사진</label>
          <input type="file" id="profile-photo" />
        </div>
        
        {session.user.provider==='credentials' && (
          <>
            <div className={classes.control}>
              <label htmlFor="old-password">비밀번호</label>
              <input type="password" id="old-password" ref={oldPasswordRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password">새 비밀번호</label>
              <input type="password" id="new-password" ref={newPasswordRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password-check">비밀번호 확인</label>
              <input
                type="password"
                id="new-password-check"
                ref={newPasswordCheckRef}
              />
            </div>
          </>
        )}
        <div className={classes.action}>
          <button>프로필 수정</button>
        </div>
      </form>
      <div className={classes.action}>
        <button onClick={logoutHandler}>로그아웃</button>
      </div>
    </>
  );
}

export default ProfileForm;
