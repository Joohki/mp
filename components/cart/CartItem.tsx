import classes from './CartItem.module.scss';
import {priceFormat} from '@/utils/utils'
interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem = (props:CartItemProps) => {
  
const price = priceFormat(props.price)
  return (
    <li className={classes.cartitem}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}원</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;