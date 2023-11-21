import Image from "next/image";
import classes from "./Mpfirst.module.css";
function Mpfirst() {
  return (
    <div className={classes.outer}>
      <Image src="/images/mpimage/main.jpg" priority fill  sizes="(max-width: 732px) 90vw, (max-width: 992px) 45vw, 320px"/>
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
