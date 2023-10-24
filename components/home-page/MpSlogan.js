import Image from "next/image";
import classes from "./MpSlogan.module.css";
function Slogan() {
  return (
    <div className={classes.slogan}>
      <Image
        src="/images/mpimage/mpslogan.png"
        alt="mp slogan"
        priority={true}
        fill
      />
    </div>
  );
}
export default Slogan;
