import classes from "./modal.module.css";
import ReactDOM  from 'react-dom';
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>,document.getElementById('overlays'))}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
    </>
  );
};
export default Modal;
