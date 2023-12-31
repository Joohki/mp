import Image from "next/image";
import classes from "./Logo.module.css";

function Logo(props) {
  const { isMouseOverMenu } = props;
  return (
    <div className={isMouseOverMenu ? classes.mouseoverlogo : classes.logo}>
      {isMouseOverMenu ? (
        <Image
          src="/images/mpimage/MPLOGO.png"
          width={176}
          height={32}
          
        ></Image>
      ) : (
        <Image
          src="/images/mpimage/MPLOGOwhite.png"
          width={176}
          height={32}
          
        ></Image>
      )}
    </div>
  );
}

export default Logo;
