import { useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { cartActions } from "../../redux/reducer/cart";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [isOrder, setIsOrder] = useState(false); //장바구니에서 오더를 클릭하면 사용자 정보를 넣는 창을 띄우기 위한 상태
  const [isLoading, setIsLoading] = useState(false); //주문을 해서 백엔드에 post하는 동안 로딩창을 띄우기 위한 상태
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false); //오더가 갔는지 확인하고 완료 메시지를 띄우기 위한 상태
  const cartItems = useSelector((state) => state.cart.items);
  const hasItem = Boolean(cartItems.length);
  const totalAmount = useSelector((state) => 
    state.cart.totalAmount
  ).toFixed(2);
  const addCartItemHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };
  const removeCartItemHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  //   const clearCartItemHandler = () => {
  //     cartCtx.clearItem();
  //   };
  //   const orderHandler = () => {
  //     setIsOrder(true);
  //   };
  //   const submitOrderHandler = async (userData) => {
  //     setIsLoading(true);

  //     await fetch(
  //       "https://product-e33d6-default-rtdb.firebaseio.com/products.json",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ user: userData, orderdata: cartCtx.items }),
  //       }
  //     ); //response 변수를 이용해서 오류제어를 할 수 있음
  //     setIsLoading(false);
  //     setIsSubmitSuccess(true);
  //     clearCartItemHandler();
  //   };
  const cartItemsCard = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item) => {
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
      {hasItem ? <button className={classes.button}>Order</button> : null}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItemsCard}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* {isOrder && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )} */}
      {!isOrder && modalAction}
    </>
  );
  const submittingModalContent = (
    <>
      <p>submittiing order...</p>
    </>
  );
  const afterSubmitModal = (
    <>
      <p>submitted</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onCloseModal={props.onCloseCart}>
      {isLoading && submittingModalContent}
      {!isLoading && !isSubmitSuccess && cartModalContent}
      {!isLoading && isSubmitSuccess && afterSubmitModal}
    </Modal>
  );
};
export default Cart;
