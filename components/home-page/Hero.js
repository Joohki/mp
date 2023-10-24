import Image from "next/image";

import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/mpimage/mplogo.jpeg"
          alt="An image showing MP"
          width={300}
          height={300}
        />
      </div>
      <h1>주식회사 MP입니다</h1>

      <Image
        src="/images/mpimage/image1.jpeg"
        alt="메인 배경 이미지"
        priority={true}
        fill
      />
    </section>
  );
}

export default Hero;
