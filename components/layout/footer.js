import React from "react";

import classes from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.customerGuide}>
        <ul className={classes.customerGuideList}>
          <li>
            인재채용
          </li>
          <li>입점/제휴문의</li>
          <li>공지사항</li>
          <li>고객의 소리</li>
          <li>제휴마케팅</li>
          <li>광고안내</li>
        </ul>
      </div>

      <div className={classes.mpInformation}>
        <ul className={classes.mpInformationList}>
          <li>
            <span>
              상호명 및 호스팅 서비스 제공<span> : </span>MP(주)
            </span>
          </li>
          <li>
            <span>
              대표이사<span> : </span>이기원
            </span>
          </li>
          <li>
            <span>서울시 서초구 강남대로 309 914호</span>
          </li>
          <li>
            <span>
              사업자 등록번호<span> : </span>896-81-01767
            </span>
          </li>
        </ul>
        <div className={classes.customerCenter}>
          <div className={classes.customerCenterTelephone}>
            <Link href="tel:02-3471-0888">02-3471-0888</Link>
          </div>

          <div className={classes.customerCenterEmail}>
            email<span>:</span> jhk@mpmasterpiece.co.kr
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
