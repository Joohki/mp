import { RotatingLines } from "react-loader-spinner";
import classes from "./loader.module.css";
export default function Loader({ basic }) {
  if (basic) {
    return (
      <div className={classes.basicWrapper}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="1"
          width="30"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="1"
          width="30"
          visible={true}
        />
      </div>
    </div>
  );
}
