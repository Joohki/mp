import Image from "next/image";
import classes from "./CeoIntro.module.css";
const CeoIntro = () => {
  return (
    <div className={classes.ceo}>
      <Image
        src="/images/mpimage/ceointro.jpg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default CeoIntro;
