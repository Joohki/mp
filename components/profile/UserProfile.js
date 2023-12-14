import { faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  async function changePasswordHandler(passwordData) {
    try {
      if (passwordData.newPassword === passwordData.newPasswordCheck) {
        const response = await fetch("/api/auth/change-password", {
          method: "PATCH",
          body: JSON.stringify(passwordData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something Went Wrong");
        }
        toast.success("프로필 수정이 완료되었습니다.");
        router.replace("/profile");
        return data;
      } else {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <section className={classes.profile}>
      <h1>프로필</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
