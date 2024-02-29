import classes from "./HoverNavigation.module.css";
import Link from "next/link";
function HoverNavigation() {
  return (
    <header className={classes.hoverHeader}>
      <div className={classes.item}>
        회사소개
        <ul>
          <Link href="/ceo">CEO 인사말</Link>
        </ul>
        <ul>
          <Link href="/companies/A&Kglobal">A&K 글로벌</Link>
        </ul>
        <ul>
          <Link href="/companies/E&C">신창이앤씨</Link>
        </ul>
        <ul>
          <Link href="/companies/hedone">헤도네</Link>
        </ul>
        <ul>
          <Link href="/companies/E&E Tech">E&E Tech</Link>
        </ul>
      </div>
      <div className={classes.item}>사업정보 </div>
      <div className={classes.item}>투자정보</div>
      <div className={classes.item}>에너지</div>
      <div className={classes.item}>
        알림마당
        <ul>
          <Link href="/notice-board">게시판</Link>
        </ul>
      </div>
    </header>
  );
}
export default HoverNavigation;

{
  /* <ul>회사소개</ul>
<ul>사업정보</ul>
<ul>투자정보</ul>
<ul>에너지</ul>
<ul>알림마당</ul> */
}
