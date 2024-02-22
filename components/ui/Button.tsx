import classNames from "classnames";
import classes from "./Button.module.scss";

interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  admin?: boolean;
  bgColor?: string;
  fgColor?: string;
  width?: string;
  [x: string]: any;
}

const Button = ({
  type = "button",
  admin = false,
  bgColor,
  fgColor,
  width,
  ...restProps
}: IButtonProps) => {
  const composeClasses = classNames(
    classes.button,
    admin ? classes.admin : classes.primary
  );

  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
  };

  return (
    <button
      className={composeClasses}
      type={type}
      style={style}
      {...restProps}
    />
  );
};

export default Button;
