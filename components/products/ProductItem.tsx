import classes from "./ProductItem.module.css";
import ProductItemForm from "./ProductForm";
import { priceFormat } from "@/utils/utils";
import { IProduct } from "@/types";

const ProductItem = (props: { product: IProduct }) => {
  const { product } = props;

  return (
    <div className={classes.product}>
      <div>
        <h3>{product.name}</h3>
        <div className={classes.description}>{product.desc}</div>
        <div className={classes.price}>{priceFormat(product.price)}원</div>
      </div>
      <div>
        <ProductItemForm product={product} />
      </div>
    </div>
  );
};
export default ProductItem;
