import classes from "./mobilenavmenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/modal";
import Link from "next/link";
function MobileNavMenu(props) {
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
          <ul>CEO 인사말</ul>
          <li onClick={props.onCloseModal}><Link href="/companies/A&Kglobal">A&K 글로벌</Link></li>
          <li onClick={props.onCloseModal}><Link href="/companies/E&C">신창이앤씨</Link></li>
          <li onClick={props.onCloseModal}><Link href="/companies/hedone">헤도네</Link></li>
          <li onClick={props.onCloseModal}><Link href="/companies/E&E Tech">E&E Tech</Link></li>
        </div>
      </div>
    </Modal>
  );
}
export default MobileNavMenu;
