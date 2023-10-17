import classes from "./mobilenavmenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/modal";
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
          <li>A&K글로벌</li>
          <li>신창이앤씨</li>
          <li>헤도네</li>
          <li>E&E tech</li>
        </div>
      </div>
    </Modal>
  );
}
export default MobileNavMenu;
