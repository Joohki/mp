import classes from "./ProductCard.module.css";
import { ReactNode } from "react";

const ProductCard = ({ children }: { children: ReactNode }) => {
  return <div className={classes.card}>{children}</div>;
};
export default ProductCard;
