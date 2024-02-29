import Image from "next/image";
import classes from "./MpSlogan.module.css";
function Slogan() {
  return (
    <div className={classes.slogan}>
      <Image
        src="/images/mpimage/mpslogan.png"
        alt='mp 슬로건'
        priority={true}
        fill
      />
    </div>
  );
}
export default Slogan;
