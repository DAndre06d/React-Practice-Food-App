import ReactDOM from "react-dom";
import style from "./mealModal.module.css";
const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onClose} />;
};
const OverlayModal = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlay-root");
const MealModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <OverlayModal> {props.children}</OverlayModal>,
        portalElement
      )}
    </>
  );
};
export default MealModal;
