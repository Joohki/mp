import classes from "./ProductItem.module.css";
import ProductItemForm from "./ProductForm";
import {priceFormat} from '@/utils/utils'
// import ProductItemForm from "./ProductItemForm";
// import { useContext } from "react";
// import CartContext from "../../../store/cart-context";
const ProductItem = (props) => {
  //   const price = `${props.product.price.toFixed(2)}`;
  //   const cartCtx = useContext(CartContext);
  //   const addToCartHandler = (amount) => {
  //     cartCtx.addItem({
  //       id: props.id,
  //       name: props.product.name,
  //       amount: amount,
  //       price: props.product.price
  //     });
  //   };
  const { product } = props;
 
  
  return (
    <div className={classes.product}>
      <div>
        <h3>{product.name}</h3>
        <div className={classes.description}>{product.description}</div>
        <div className={classes.price}>{priceFormat(product.price)}원</div>
      </div>
      <div>
        <ProductItemForm product={product}/>
      </div>
    </div>
  );
};
export default ProductItem;
