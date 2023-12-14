import classes from "./AlreadyRegistered.module.scss";
import { useRouter } from "next/navigation";
const AlreadyRegistered = () => {
  const router = useRouter()
  return (
    <div className={classes.notification}>
      <p>해당 이메일은 이미 등록되어 있습니다.</p>
      <button onClick={()=>{router.replace('/auth')}}>확인</button>
    </div>
  );
};

export default AlreadyRegistered;
