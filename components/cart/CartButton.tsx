import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "@/redux/store";

const CartButton = (props: { onCart: () => void }) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  return (
    <button className={classes.button} onClick={props.onCart}>
      <FontAwesomeIcon icon={faCartShopping} />
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
