import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
interface ModalProps {
  onCloseModal: () => void;
  children: ReactNode;
}
const Backdrop = (props: { onCloseModal: () => void }) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal}></div>;
};
const ModalOverlay = (props: { children: ReactNode }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};
export default Modal;
