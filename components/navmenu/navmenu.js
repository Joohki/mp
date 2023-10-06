import classes from "./navmenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function NavMenu(props) {
  return (
    <div className={classes.container}>
      <div className={classes.item}>
       전체 서비스
      </div>
      <div className={classes.item}>
        <FontAwesomeIcon
          icon={faX}
          style={{ fontSize: 25, color: "black" }}
          onClick={props.onCloseModal}
        />
      </div>
      <div className={classes.item}>
        <div>회사소개</div>
        <ul>CEO 인사말</ul>
        <li>A&K글로벌</li>
        <li>신창이앤씨</li>
        <li>헤도네</li>
        <li>E&E tech</li>
      </div>
      <div className={classes.item}>
        <div>상품 및 서비스</div>
      </div>
      <div className={classes.item}>
        <div>고객지원</div>
      </div>
      <div className={classes.item}>
        <div>제휴 및 홍보</div>
      </div>
      <div className={classes.item}>
        <div>계정관리</div>
      </div>
      <div className={classes.item}>
        <div>설정</div>
      </div>
    </div>
  );
}
export default NavMenu;
