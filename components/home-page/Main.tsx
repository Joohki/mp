import classes from "./Main.module.css";
import BusinessCarousel from "./BusinessCarousel";
import Mpfirst from "./Mpfirst";
import { useState, useEffect, useRef } from "react";

function Main() {
  const [isMobile, setIsMobile] = useState(false);
  function MobileCheck() {
    if (innerWidth < 800) {
      setIsMobile(true);
    }
  }

  const outerDivRef = useRef<HTMLDivElement>(null);
  const DividerHeight = 5;
  useEffect(() => {
    MobileCheck();
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      // 스크롤 행동 구현
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current!; // 스크롤 위쪽 끝부분 위치
      const pageHeight = (window.innerHeight * 9) / 10; // 화면 세로길이, 100vh
      if (outerDivRef.current) {
        if (deltaY > 0) {
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            outerDivRef.current.scrollTo({
              top: pageHeight + DividerHeight,
              left: 0,
            });
          }
        } else {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
          });
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }
    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, []);
  return (
    <section ref={outerDivRef} className={classes.main}>
      {/* <div className={classes.image}>
        <Image
          src="/images/mpimage/mplogo.jpeg"
          alt="An image showing MP"
          width={300}
          height={300}
        />
      </div> */}
      {/* <h1>주식회사 MP입니다</h1> */}

      <Mpfirst />
      <div className={classes.divider}></div>
      {isMobile ? <></> : <BusinessCarousel />}
    </section>
  );
}

export default Main;
