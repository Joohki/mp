import { useRef, useState } from "react";
import classes from "./product-form.module.css";
import Input from "../ui/input";
import { cartActions } from "../../redux/reducer/cart";
import { useDispatch } from "react-redux";
const ProductItemForm = (props) => {
  const [amountIsVaild, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const { product } = props;
  const dispatch = useDispatch();
  const addToCartHandler = (quantity) => {
    dispatch(cartActions.addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value; 
    const enteredAmountNumber = Number(enteredAmount); 
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    addToCartHandler(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!(amountIsVaild) ? <p>유효한 값을 입력해주세요</p>:null}
    </form>
  );
};
export default ProductItemForm;
