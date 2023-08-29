import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images'
          alt='An image showing MP'
          width={300}
          height={300}
        />
      </div>
      <h1>주식회사 MP입니다</h1>
      <p>
        MP Group은 고객과 다양한 Energy Solution을 공유하며 지구환경에 기여하고자 합니다.
      </p>
      <Image
          src="/images/mpimage/image1.jpeg"
          alt="메인 배경 이미지"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
    </section>
  );
}

export default Hero;
