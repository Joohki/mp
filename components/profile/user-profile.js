import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
// import { getSession } from "next-auth/client";
// import { useEffect, useState } from "react";
function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState("");
  // useEffect(() => {
  //   async function get() {
  //     const session = await getSession();

  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   }
  //   get();
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>loading...</p>;
  // }
  //클라이언트 사이드에서 session 사용하는 코드

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/auth/change-password', {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
