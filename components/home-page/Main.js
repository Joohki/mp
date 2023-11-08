import Image from "next/image";
import Slogan from "./MpSlogan";
import classes from "./Main.module.css";

function Main() {
  return (
    <section className={classes.main}>
      {/* <div className={classes.image}>
        <Image
          src="/images/mpimage/mplogo.jpeg"
          alt="An image showing MP"
          width={300}
          height={300}
        />
      </div> */}
      {/* <h1>주식회사 MP입니다</h1> */}

      <Image
        src="/images/mpimage/image1.jpeg"
        priority={true}
        fill
      />
      <h1><span className={classes.mp}>MP</span> 그룹은 고객과 다양한 <span className={classes.red}>에너지</span> 솔루션을 공유하며,</h1>
      <h1><span className={classes.green}>지구환경</span>에 기여하고자 합니다.</h1>
    </section>
  );
}

export default Main;
