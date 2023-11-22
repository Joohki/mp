import Image from "next/image";
import classes from "./Mpfirst.module.css";
function Mpfirst() {
  return (
    <div className={classes.outer}>
      <Image src="/images/mpimage/mainpage.jpg" priority fill  />
      <div className={classes.inner}>
        <Image
          src="/images/mpimage/mainletteringback.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Mpfirst;
