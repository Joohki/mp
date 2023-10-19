import classes from "./profile-form.module.css";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import {persistor} from '../../redux/store'
function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
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
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
      <div className={classes.action}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
}

export default ProfileForm;
