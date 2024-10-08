import classes from "./Cart.module.scss";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { cartActions } from "../../redux/reducer/cart";
import Link from "next/link";
import { priceFormat } from "@/utils/utils";
import { RootState } from "@/redux/store";
import { ICartItem} from "@/types/index";
interface CartProps {
  onCloseCart: () => void;
}
const Cart = (props: CartProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const hasItem = Boolean(cartItems.length);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const addCartItemHandler = (item: ICartItem) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };
  const removeCartItemHandler = (id: string) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemsCard = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item: ICartItem) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onAdd={addCartItemHandler.bind(null, item)}
            onRemove={removeCartItemHandler.bind(null, item.id)}
          ></CartItem>
        );
      })}
    </ul>
  );
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem ? (
        <Link href="/checkout">
          <button className={classes.button} onClick={props.onCloseCart}>
            Order
          </button>
        </Link>
      ) : null}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItemsCard}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{priceFormat(totalAmount)}원</span>
      </div>

      {modalAction}
    </>
  );

  return <Modal onCloseModal={props.onCloseCart}>{cartModalContent}</Modal>;
};
export default Cart;
