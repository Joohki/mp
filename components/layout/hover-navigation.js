import classes from "./hover-navigation.module.css";
import Link from "next/link";
function HoverNavigation() {
  return (
    <header className={classes.hoverHeader}>
      <div className={classes.item}>회사소개</div>
      <div className={classes.item}>사업정보</div>
      <div className={classes.item}>투자정보</div>
      <div className={classes.item}>에너지</div>
      <div className={classes.item}>알림마당</div>
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
