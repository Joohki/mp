import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  
  return (
    <button className={classes.button} onClick={props.onCart}>
      <FontAwesomeIcon icon={faCartShopping} />
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
