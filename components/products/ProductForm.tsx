import React, { useRef, useState } from "react";
import classes from "./ProductForm.module.css";
import Input from "../ui/Input";
import { cartActions } from "../../redux/reducer/cart";
import { useDispatch } from "react-redux";
import { IProduct } from "@/types";
const ProductItemForm = (props: { product: IProduct }) => {
  const [amountIsVaild, setAmountIsValid] = useState(true);
  const amountInputRef = useRef(null);
  const { product } = props;
  const dispatch = useDispatch();
  const addToCartHandler = (quantity: number) => {
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      })
    );
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
          id: "amount_" + props.product.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsVaild ? <p>유효한 값을 입력해주세요</p> : null}
    </form>
  );
};
export default ProductItemForm;
