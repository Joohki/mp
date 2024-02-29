import classes from "./Card.module.css";
import { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
}
const Card = ({ children }: CardProps) => {
  return <div className={classes.card}>{children}</div>;
};
export default Card;
