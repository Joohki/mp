import classes from "./NavMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";
import Link from "next/link";
function NavMenu(props: { onCloseModal: () => void }) {
  return (
    <Modal onCloseModal={props.onCloseModal}>
      <div className={classes.container}>
        <div className={classes.item}>전체 서비스</div>
        <div className={classes.item}>
          <FontAwesomeIcon
            icon={faX}
            style={{ fontSize: 25, color: "black" }}
            onClick={props.onCloseModal}
          />
        </div>
        <div className={classes.item}>
          <div>회사소개</div>
          <ul onClick={props.onCloseModal}>
            <Link href="/ceo">CEO 인사말</Link>
          </ul>
          <li onClick={props.onCloseModal}>
            <Link href="/companies/A&Kglobal">A&K 글로벌</Link>
          </li>
          <li onClick={props.onCloseModal}>
            <Link href="/companies/E&C">신창이앤씨</Link>
          </li>
          <li onClick={props.onCloseModal}>
            <Link href="/companies/hedone">헤도네</Link>
          </li>
          <li onClick={props.onCloseModal}>
            <Link href="/companies/E&E Tech">E&E Tech</Link>
          </li>
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
    </Modal>
  );
}
export default NavMenu;
